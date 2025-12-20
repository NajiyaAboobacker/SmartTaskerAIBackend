import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function test() {
  const res = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "Give a short suggestion for creating webpages." }],
    max_tokens: 50
  });
  console.log("AI Suggestion:", res.choices[0].message.content);
}

test();
