import React, { useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";
import useFetchLessons from "./useFetch";
import { Button } from "@/components/ui/button";
import jsPDF from "jspdf";

function FetchLesson() {
  const { lessonPlans, loading, error } = useFetchLessons();
  const pdfRef = useRef();

  // Function to download lesson as PDF
  const downloadPDF = (lesson, index) => {
    const pdf = new jsPDF();
    let yPosition = 10; // Starting y position

    pdf.text(`Class Level: ${lesson.classLevel}`, 10, yPosition);
    yPosition += 10;
    pdf.text(
      `Created At: ${new Date(lesson.createdAt).toLocaleDateString()}`,
      10,
      yPosition
    );
    yPosition += 10;
    pdf.text("Objectives:", 10, yPosition);
    yPosition += 10;

    lesson.lessonPlan.objectives?.forEach((obj, i) => {
      pdf.text(`${i + 1}. ${obj}`, 10, yPosition);
      yPosition += 10;

      // Check if yPosition exceeds page height
      if (yPosition > 280) {
        pdf.addPage();
        yPosition = 10; // Reset y position for new page
      }
    });

    pdf.save(`Lesson_${lesson.classLevel}.pdf`);
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <motion.div
        className="max-w-4xl w-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Lesson Plans 📚
        </h2>

        {loading ? (
          <Skeleton className="h-40 w-full rounded-lg bg-gray-200" />
        ) : error ? (
          <p className="text-red-500 text-center">{error}</p>
        ) : lessonPlans.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {lessonPlans.map((lesson, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card className="shadow-lg border border-gray-200 p-4 h-auto">
                  <CardContent id={`lesson-${index}`} ref={pdfRef}>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Class Level: {lesson.classLevel}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      <strong>Created At:</strong>{" "}
                      {new Date(lesson.createdAt).toLocaleDateString()}
                    </p>

                    <div className="mt-2">
                      <h4 className="text-sm font-bold text-blue-600">
                        Objectives:
                      </h4>
                      <ul className="list-disc pl-4 text-xs text-gray-700">
                        {lesson.lessonPlan.objectives?.map((obj, i) => (
                          <li key={i}>{obj}</li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>

                  {/* Download PDF Button */}
                  <Button
                    onClick={() => downloadPDF(lesson, index)}
                    className="mt-3 w-full bg-blue-500 text-white hover:bg-blue-600"
                  >
                    Download PDF
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
        ) : (
          <p className="text-red-500 text-center">No lesson found.</p>
        )}
      </motion.div>
    </div>
  );
}

export default FetchLesson;
