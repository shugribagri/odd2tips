import TipsterComp from "../models/tipsterComp.mjs";

const createTipsterEntry = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required." });
    }

    const existingTipster = await TipsterComp.findOne({ email });
    if (existingTipster) {
      return res.status(400).json({ message: "Email already exists." });
    }

    const newTipster = new TipsterComp({ name, email });
    await newTipster.save();

    res.status(201).json({
      message: "Tipster entry created successfully!",
      tipster: newTipster,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export { createTipsterEntry };
