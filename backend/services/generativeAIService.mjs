import { GoogleGenerativeAI } from "@google/generative-ai";

class GenerativeAIService {
  constructor() {
    this.apiKey = process.env.GENERATIVE_AI_API_KEY;
    this.genAI = new GoogleGenerativeAI(this.apiKey);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
  }

  async formatContent(content, title) {
    const prompt = `Format the following content - ${content} with the following title - ${title} AND RETURN THE FORMATTED CONTENT: 

    I want easy-to-read plagiarism-free content for this markdown content. 
    AVOID AI PHRASES LIKE: Interplay, intricate, multifaceted, complex, dive, tapestry, etc. 
    Use simple language and short sentences.

    use spaces between paragraphs and headings to make it easy to read.
    use markdown syntax for headings, bold and italics.

    EXAMPLE: DO NOT RETURN JSON OBJECT, JUST RETURN THE FORMATTED CONTENT.
    "
    ## Lorem Ipsum

    Tristique senectus et netus et malesuada fames ac turpis. Ridiculous mus mauris vitae ultricies leo integer malesuada nunc vel. 
    In mollis nunc sed id semper. Egestas tellus rutrum tellus pellentesque.

    Phasellus vestibulum lorem sed risus ultricies tristique nulla. 
    Quis blandit turpis cursus in hac \"habitasse platea dictumst quisque\". Eros donec ac odio tempor orci dapibus ultrices. 
    Aliquam sem et tortor consequat id porta nibh. 

    ### Dolor Sit Amet
    
    Adipiscing elit duis tristique sollicitudin nibh sit amet commodo nulla. 
    Diam vulputate ut pharetra sit amet. Ut tellus elementum sagittis vitae et leo. Arcu non odio euismod lacinia at quis risus sed vulputate."
    `;
    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      console.log("Formatted content:", text);
      return text;
    } catch (error) {
      console.error("Error formatting content:", error);
      throw new Error("Failed to format content");
    }
  }

  async generateExcerpt(content, title) {
    const prompt = `Summarize the following content - ${content} with the following title - ${title} AND RETURN THE GENERATED EXCERPT CONTENT:
    
    DO NOT RETURN JSON OBJECT, JUST RETURN THE GENERATED EXCERPT CONTENT.

   The excerpt should be a short summary of the content that captures the main points of the article (30 words).

    I want easy-to-read plagiarism-free content for this content.  
    Use simple language and short sentences.
    `;

    try {
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      console.log("Formatted content:", text);
      return text;
    } catch (error) {
      console.error("Error formatting content:", error);
      throw new Error("Failed to format content");
    }
  }
}

export default GenerativeAIService;
