import OpenAI from "openai";

export const generateAISuggestion = async (title, description) => {
  // Check if the OpenAI API key is present
  if (!process.env.OPENAI_API_KEY) {
    console.log("⚠ No OpenAI API key found. AI suggestions will not work.");
    return "AI not configured";
  }

  try {
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    console.log("Generating AI suggestion for task:", { title, description });

    const prompt = `Give a short, helpful suggestion for this task:
Title: ${title}
Description: ${description}`;

    const response = await openai.responses.create({
      model: "gpt-5-nano",
      input: prompt,
    });

    console.log("Raw AI response:", response);

    const suggestion = response.output_text?.trim() || "No suggestion generated";

    console.log("Final AI suggestion:", suggestion);

    return suggestion;
  } catch (err) {
    console.log("AI Error:", err.message);
    return "AI Error";
  }
};
