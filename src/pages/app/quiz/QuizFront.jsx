import React, {useEffect, useState} from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import { Link } from "react-router-dom";

// import images
import post1Img from "@/assets/images/all-img/post-1.png";
import {getQuizs} from "@/Services/quizApi.js";
const QuizFront = () => {

    const [quizes, setQuizes] = useState([])


    useEffect(() => {
        getQuizs().then((data) => {
            const formattedData = data.map((quiz) => ({
                id: quiz.id,
                name: quiz.name,
                subject: quiz.subject,
                questions: quiz.questions,
            }))
            setQuizes(formattedData);
        });
    }, []);

    return (


        <section className=" dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
                 <div className="grid md:grid-cols-2 gap-8">
                     {quizes.map((quiz) => (
                         <div
                             className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12">
                             <a href="#"
                                className="bg-purple-100 text-purple-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-purple-400 mb-2">
                                 <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none" viewBox="0 0 20 16">
                                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                           strokeWidth="2" d="M5 4 1 8l4 4m10-8 4 4-4 4M11 1 9 15"/>
                                 </svg>
                                 {quiz.subject}
                             </a>
                             <h2 className="text-gray-900 dark:text-white text-3xl font-extrabold mb-2">{quiz.name}</h2>
                             <p className="text-lg font-normal text-gray-500 dark:text-gray-400 mb-4">Number of Questions : {quiz.questions.length}</p>
                             <Link to={`${quiz.id}`}
                                   className="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center">Start Quiz
                                 <svg className="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true"
                                      xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                     <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                           strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                 </svg>
                             </Link>
                         </div>
                     ))}
                 </div>
            </div>
        </section>

    );
};

export default QuizFront;
