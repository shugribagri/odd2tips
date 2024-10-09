import RequestCount from "../models/requestCount.mjs";

const getRequestCount = async (req, res) => {
  const endpoint = "gameDataCollect";

  try {
    const requestCounter = await RequestCount.findOne({ endpoint: endpoint });

    if (requestCounter) {
      res.json({ count: requestCounter.count });
    } else {
      res.status(404).json({ message: "Request count not found" });
    }
  } catch (error) {
    console.error("Error retrieving request count:", error);
    res.status(500).json({ message: "Failed to fetch request count" });
  }
};

export { getRequestCount };
