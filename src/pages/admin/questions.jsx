import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Questions({ setShowHeaderFooter }) {
  const [questions, setQuestions] = useState([]);
  const [editingAnswer, setEditingAnswer] = useState({ id: null, answer: "" });
  const [error, setError] = useState(null);

  useEffect(() => {
    setShowHeaderFooter(false);
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get("http://localhost:3000/question");
        setQuestions(response.data.data);
        setError(null); // Reset error state upon successful fetch
      } catch (error) {
        handleFetchQuestionsError(error);
      }
    };

    fetchQuestions();
  }, []);

  const handleFetchQuestionsError = (error) => {
    if (error.response) {
      const { status, data } = error.response;
      setError(data.message || `Error fetching questions. Status: ${status}`);
    } else {
      setError(error.message || "Network error. Failed to fetch questions.");
    }
  };

  const handleEdit = (questionId, answer) => {
    setEditingAnswer({ id: questionId, answer });
  };

  const handleSave = async () => {
    try {
      if (!editingAnswer.answer.trim()) {
        setError("Answer cannot be empty");
        return;
      }

      await axios.put(`http://localhost:3000/question/${editingAnswer.id}`, {
        answer: editingAnswer.answer,
      });

      const updatedQuestions = questions.map((question) => {
        if (question.id === editingAnswer.id) {
          return { ...question, answer: editingAnswer.answer, status: 1 };
        }
        return question;
      });

      setQuestions(updatedQuestions);
      setEditingAnswer({ id: null, answer: "" });
      setError(null); // Reset error state upon successful save
    } catch (error) {
      handleSaveError(error);
    }
  };

  const handleSaveError = (error) => {
    if (error.response) {
      const { status, data } = error.response;
      setError(data.message || `Error saving answer. Status: ${status}`);
    } else {
      setError(error.message || "Network error. Failed to save answer.");
    }
  };

  const handleDelete = async (questionId) => {
    try {
      await axios.delete(`http://localhost:3000/question/${questionId}`);

      const updatedQuestions = questions.filter(
        (question) => question.id !== questionId
      );

      setQuestions(updatedQuestions);
      setError(null); // Reset error state upon successful delete
    } catch (error) {
      handleDeleteError(error);
    }
  };

  const handleDeleteError = (error) => {
    if (error.response) {
      const { status, data } = error.response;
      setError(data.message || `Error deleting question. Status: ${status}`);
    } else {
      setError(error.message || "Network error. Failed to delete question.");
    }
  };

  return (
    <div className="p-4 h-screen">
      <h1 className="text-2xl md:text-3xl lg:text-4xl text-center text-gray-800 font-bold mb-4">
        User Questions
      </h1>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-800 text-white uppercase text-xs md:text-sm lg:text-base leading-normal">
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Question</th>
              <th className="py-3 px-6 text-left">Answer</th>
              <th className="py-3 px-6 text-left">Status</th>
              <th className="py-3 px-6 text-left">Created At</th>
              <th className="py-3 px-6 text-left">Updated At</th>
              <th className="py-3 px-6 text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-xs md:text-sm lg:text-base font-light">
            {questions.map((question) => (
              <tr
                key={question.id}
                className="border-b border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6 text-left whitespace-nowrap">
                  {question.profile.name}
                </td>
                <td className="py-3 px-6 text-left">{question.question}</td>
                <td className="py-3 px-6 text-left">
                  <div className="max-w-xs overflow-hidden">
                    {editingAnswer.id === question.id ? (
                      <input
                        type="text"
                        value={editingAnswer.answer}
                        onChange={(e) =>
                          setEditingAnswer({
                            ...editingAnswer,
                            answer: e.target.value,
                          })
                        }
                        className="w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring focus:ring-blue-200 text-xs md:text-sm lg:text-base"
                      />
                    ) : (
                      <span
                        className="whitespace-normal break-all text-xs md:text-sm lg:text-base"
                        style={{ wordWrap: "break-word" }}
                      >
                        {question.answer}
                      </span>
                    )}
                  </div>
                </td>

                <td className="py-3 px-6 text-left">
                  {question.status ? "Answered" : "Unanswered"}
                </td>
                <td className="py-3 px-6 text-left">
                  {new Date(question.createdAt).toLocaleString()}
                </td>
                <td className="py-3 px-6 text-left">
                  {new Date(question.updatedAt).toLocaleString()}
                </td>
                <td className="py-3 px-6 text-left">
                  <div className="flex">
                    {editingAnswer.id === question.id ? (
                      <button
                        onClick={handleSave}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                      >
                        Save
                      </button>
                    ) : (
                      <button
                        onClick={() => handleEdit(question.id, question.answer)}
                        className="bg-gray-800 hover:bg-gray-700 text-white w-1/2 font-bold py-2 px-4 rounded mr-2"
                      >
                        Edit
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(question.id)}
                      className="bg-red-500 hover:bg-red-700 text-white w-1/2 font-bold py-2 px-4 rounded"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
