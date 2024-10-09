import Message from "../models/Room.mjs";

const getMessages = async (req, res) => {
  const limit = 10;
  const page = parseInt(req.query.page) || 1;

  const offset = (page - 1) * limit;

  try {
    const messages = await Message.find()
      .sort({ createdAt: -1 })
      .skip(offset)
      .limit(limit);

    messages.reverse();
    const totalMessages = await Message.countDocuments();

    const hasMore = messages.length === limit && offset + limit < totalMessages;

    res.json({
      messages,
      hasMore,
    });
  } catch (error) {
    console.error("Failed to fetch messages:", error);
    res.status(500).json({ message: "Failed to fetch messages" });
  }
};

export { getMessages };
