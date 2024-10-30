import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

// Function to decode HTML entities
const decodeHtml = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
};

const BASE_URL = "http://127.0.0.1:8000";

const Quiz = ({ userId }) => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);
    const [score, setScore] = useState(0);
    const [quizFinished, setQuizFinished] = useState(false);
    const [timer, setTimer] = useState(60); // Timer set for 2 minutes (120 seconds)

    useEffect(() => {
        const fetchQuizQuestions = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/api/game/quiz`);
                const decodedQuestions = response.data.map((question) => ({
                    ...question,
                    question: decodeHtml(question.question),
                    correct_answer: decodeHtml(question.correct_answer),
                    incorrect_answers: question.incorrect_answers.map(decodeHtml),
                }));
                setQuestions(decodedQuestions);
            } catch (error) {
                console.error("Failed to fetch questions:", error);
                //toast.error("Failed to load quiz questions.");
            }
        };

        fetchQuizQuestions();
    }, []);

    // Timer logic
    useEffect(() => {
        if (timer > 0 && !quizFinished) {
            const interval = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);
            return () => clearInterval(interval); // Cleanup on unmount
        } else if (timer === 0) {
            calculateFinalScore(); // Automatically finish the quiz when the timer runs out
        }
    }, [timer, quizFinished]);

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
               // toast.info("You scored below 50%. Better luck next time!");
            }
        }
        setQuizFinished(true);
    };

    return (
        <div className="flex flex-col items-center justify-center p-10 bg-gray-100 rounded-lg shadow-lg transition duration-300 ease-in-out">
            <h2 className="text-4xl font-bold text-black mb-2">Quiz Time!</h2>
            <p className="text-lg text-gray-700 mb-1">Obtenez plus de 3/5 pour obtenir +2 points gratuitement</p>
            <p className="text-lg text-red-600 mb-4">Temps restant: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</p>
        
            {quizFinished ? (
                <div className="text-center">
                    <h3 className="text-3xl font-medium text-black mb-4">Your Score: {score}/{questions.length}</h3>
                    <button onClick={() => window.location.reload()} className="bg-white text-gray-800 px-8 py-3 rounded-lg shadow-lg hover:bg-gray-200 transition duration-200 ease-in-out">
                        Retry Quiz
                    </button>
                </div>
            ) : (
                <div className="w-full max-w-md">
                    {questions.length > 0 && currentQuestionIndex < questions.length ? (
                        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-300 transition duration-300 ease-in-out hover:shadow-xl">
                            <h3 className="mb-4 text-xl font-medium text-black">{`Question ${currentQuestionIndex + 1}:`}</h3>
                            <p className="text-gray-800 mb-4">{questions[currentQuestionIndex].question}</p>
                            <ul>
                                {questions[currentQuestionIndex].incorrect_answers.map((option, index) => (
                                    <li key={index}>
                                        <button
                                            onClick={() => handleAnswer(option)}
                                            className="bg-gray-300 text-black px-4 py-2 rounded m-1 hover:bg-gray-400 transition duration-150 ease-in-out"
                                        >
                                            {option}
                                        </button>
                                    </li>
                                ))}
                                <li>
                                    <button
                                        onClick={() => handleAnswer(questions[currentQuestionIndex].correct_answer)}
                                        className="bg-gray-300 text-black px-4 py-2 rounded m-1 hover:bg-gray-400 transition duration-150 ease-in-out"
                                    >
                                        {questions[currentQuestionIndex].correct_answer}
                                    </button>
                                </li>
                            </ul>
                        </div>
                    ) : (
                        <div className="text-center">
                            <button
                                onClick={calculateFinalScore}
                                className="bg-green-600 text-white px-8 py-3 rounded-lg shadow-lg hover:bg-green-700 transition duration-200 ease-in-out"
                            >
                                Finish Quiz
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Quiz;
