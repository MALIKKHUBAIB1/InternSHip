import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_API_KEY } from "../Utils/const"; // Import API key

const apiKey = GEMINI_API_KEY; // Ensure key is set
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash", // Use latest model
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
};

/**
 * Function to generate lesson plan using Gemini AI
 * @param {string} subject - The subject of the lesson
 * @param {string} topic - The topic of the lesson
 * @param {string} classLevel - The class level
 * @returns {Promise<string>} - Returns the AI-generated lesson plan
 */
export async function generateLessonPlan(subject, topic, classLevel) {
  try {
    const chatSession = model.startChat({
      generationConfig,
      history: [],
    });

    const prompt = `
      You are an AI expert in lesson planning. Generate a structured lesson plan in JSON format for:
      - Subject: ${subject}
      - Topic: ${topic}
      - Class Level: ${classLevel}

      Format the JSON as:
      {
        "title": "Lesson Title",
        "overview": "Brief lesson introduction",
        "objectives": ["Objective 1", "Objective 2"],
        "materials": ["Item 1", "Item 2"],
        "lesson_outline": [
          {"step": "Introduction", "details": "Explain the topic"},
          {"step": "Main Content", "details": "Detailed teaching"}
        ],
        "assessment": "Assessment method"
      }
    `;

    const result = await chatSession.sendMessage(prompt);
    return await result.response.text(); // ✅ Return the response
  } catch (error) {
    console.error("Error generating lesson plan:", error);
    return "Error: Unable to generate lesson plan.";
  }
}
