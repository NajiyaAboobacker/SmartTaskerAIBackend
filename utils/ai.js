import OpenAI from "openai";

export const generateAISuggestion = async (title, description) => {
  if (!process.env.OPENAI_API_KEY) {
    console.log("⚠ No OpenAI key found.");
    return "AI not configured";
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const prompt = `Give a short helpful suggestion for this task:
    Title: ${title}
    Description: ${description}`;

    const response = await openai.responses.create({
      model: "gpt-5-nano",
      input: prompt,
    });

    return response.output_text?.trim() || "No suggestion";
  } catch (err) {
    console.log("AI Error:", err.message);
    return "AI Error";
  }
};
