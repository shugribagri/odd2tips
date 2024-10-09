import markdownToHtmlUtils from "../utils/markdownToHtml.mjs";

const markdownToHtml = async (req, res) => {
  const markdown = req.body.markdown;
  const html = await markdownToHtmlUtils(markdown);
  res.json({ html });
};

export default markdownToHtml;
