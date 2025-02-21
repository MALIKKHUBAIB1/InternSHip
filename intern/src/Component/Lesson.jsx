import React, { useState } from "react";
import { generateLessonPlan } from "../Utils/Gemini"; // ✅ Import API function
import LessonPlanDisplay from "./LessonDisplay";

function Lesson() {
  const [subject, setSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [classLevel, setClassLevel] = useState("");
  const [lessonPlan, setLessonPlan] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    // ✅ Prevent API call if fields are empty
    if (!subject || !topic || !classLevel) {
      alert("Please fill in all fields before generating a lesson plan.");
      return;
    }

    setLoading(true);
    const response = await generateLessonPlan(subject, topic, classLevel);
    console.log(response);

    try {
      const cleanedResponse = response.replace(/```json|```/g, "").trim();
      const parsedResponse = JSON.parse(cleanedResponse);
      setLessonPlan(parsedResponse);

      // ✅ Push to Firebase Realtime Database
      await fetch(
        "https://lesson-project-19c68-default-rtdb.firebaseio.com/lessonPlans.json",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subject,
            topic,
            classLevel,
            lessonPlan: parsedResponse,
            createdAt: new Date().toISOString(),
          }),
        }
      );

      console.log("Lesson plan saved to Firebase!");
    } catch (error) {
      console.error("Error parsing or saving lesson plan:", error);
      setLessonPlan(null);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex justify-center items-center p-6">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-4">
          AI Lesson Planner
        </h2>
        {/* ✅ Input Fields */}
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            placeholder="Class Level"
            value={classLevel}
            onChange={(e) => setClassLevel(e.target.value)}
            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* ✅ Generate Button */}
        <button
          onClick={handleGenerate}
          className={`w-full mt-4 text-white font-medium px-4 py-3 rounded-lg transition duration-300 ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
          disabled={loading}
        >
          {loading ? "Generating..." : "Generate Lesson Plan"}
        </button>
        {/* ✅ Display Lesson Plan */}
        <LessonPlanDisplay lessonPlan={lessonPlan} />
      </div>
    </div>
  );
}

export default Lesson;
