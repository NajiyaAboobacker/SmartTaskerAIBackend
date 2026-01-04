import OpenAI from "openai";

export const generateAISuggestion = async (title, description) => {
  if (!process.env.OPENAI_API_KEY) {
    console.log("⚠ No OpenAI key found.");
    return "AI not configured";
  }

  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful task management assistant.",
        },
        {
          role: "user",
          content: `Give a short helpful suggestion for this task.
Title: ${title}
Description: ${description}`,
        },
      ],
    });

    return response.choices[0].message.content.trim();
  } catch (err) {
    console.error("AI Error:", err);
    return "AI suggestion unavailable";
  }
};
