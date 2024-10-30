import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

// Function to decode HTML entities
const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
};

const BASE_URL = "http://127.0.0.1:8000";

const Quiz = ({ userId }) => { // Accept userId as a prop
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);

    useEffect(() => {
        const fetchQuizQuestions = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/game/quiz`);
                // Decode HTML entities in the questions
                const decodedQuestions = response.data.map(question => ({
                    ...question,
                    question: decodeHtml(question.question),
                    correct_answer: decodeHtml(question.correct_answer),
                    incorrect_answers: question.incorrect_answers.map(decodeHtml),
                }));
                setQuestions(decodedQuestions);
            } catch (error) {
                console.error("Failed to fetch questions:", error);
                toast.error("Failed to load quiz questions.");
            }
        };

        fetchQuizQuestions();
    }, []);

    const handleAnswer = (answer) => {
        const isCorrect = answer === questions[currentQuestionIndex].correct_answer;
        setUserAnswers((prev) => [...prev, isCorrect]);
        if (isCorrect) {
            setScore((prev) => prev + 1);
        }
        setCurrentQuestionIndex((prev) => prev + 1);
    };

    const calculateFinalScore = async () => {
        const totalQuestions = questions.length;
        if (totalQuestions > 0) {
            const percentage = (score / totalQuestions) * 100;
            if (percentage > 50) {
                // Award points to the user for scoring more than 50%
                const pointsToAdd = 2;
                try {
                    await axios.patch(`${BASE_URL}/api/game/addpoints/${userId}`, {
                        points: pointsToAdd,
                    });
                    toast.success(`Congratulations! You scored more than 50% and earned ${pointsToAdd} points!`);
                } catch (error) {
                    console.error("Failed to add points:", error);
                    toast.error("Failed to add points.");
                }
            } else {
                toast.info("You scored below 50%. Better luck next time!");
            }
        }
        setQuizFinished(true);
    };

    return (
        <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Quiz</h2>
            {quizFinished ? (
                <div>
                    <h3>Your Score: {score}/{questions.length}</h3>
                    <button onClick={() => window.location.reload()} className="bg-blue-500 text-white px-4 py-2 rounded">Retry Quiz</button>
                </div>
            ) : (
                <div>
                    {questions.length > 0 && currentQuestionIndex < questions.length ? (
                        <div>
                            <h3 className="mb-2">{`Question ${currentQuestionIndex + 1}: ${questions[currentQuestionIndex].question}`}</h3>
                            <ul>
                                {questions[currentQuestionIndex].incorrect_answers.map((option, index) => (
                                    <li key={index}>
                                        <button onClick={() => handleAnswer(option)} className="bg-gray-300 text-black px-4 py-2 rounded m-1">{option}</button>
                                    </li>
                                ))}
                                <li>
                                    <button onClick={() => handleAnswer(questions[currentQuestionIndex].correct_answer)} className="bg-gray-300 text-black px-4 py-2 rounded m-1">{questions[currentQuestionIndex].correct_answer}</button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <button onClick={calculateFinalScore} className="bg-green-500 text-white px-4 py-2 rounded">Finish Quiz</button>
                    )}
                </div>
            )}
        </div>
    );
};

export default Quiz;
