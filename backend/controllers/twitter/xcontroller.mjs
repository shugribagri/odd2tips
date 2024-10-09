import XData from "../../models/XData.mjs";

const XDataUpload = async (req, res) => {
  try {
    const { markdown, fileUrls } = req.body;

    const xdata = new XData({
      fileUrls,

      markdown,
    });

    await xdata.save();

    res.status(200).json({
      message: "XData saved successfully!",
      data: xdata,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error saving xdata" });
  }
};

export { XDataUpload };
