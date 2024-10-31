import React, {Fragment, useEffect, useState} from "react";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import {Link, useParams} from "react-router-dom";

// import images
import post1Img from "@/assets/images/all-img/post-1.png";
import {getQuizInfo, getQuizs} from "@/Services/quizApi.js";
const QuizFront = () => {

    const [quiz, setQuiz] = useState({
        questions: []
    })
    const { id } = useParams();

    useEffect(() => {
        getQuizInfo(id).then((data) => {
            setQuiz(data);
            console.log(data)
        });
    }, []);

    return (


        <section className=" dark:bg-gray-900">
            <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16">
                <div
                    className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-8 md:p-12">
                    <div className="flex flex-col gap-2 align-middle justify-center">

                        <div className="flex justify-between">
                            <a href="#"
                               className="bg-purple-100 self-start text-purple-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-md dark:bg-gray-700 dark:text-purple-400 mb-2">
                                <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true"
                                     xmlns="http://www.w3.org/2000/svg"
                                     fill="none" viewBox="0 0 20 16">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" d="M5 4 1 8l4 4m10-8 4 4-4 4M11 1 9 15"/>
                                </svg>
                                {quiz.subject}
                            </a>
                            <h1 className="text-5xl self-end font-extrabold dark:text-white">#1</h1>
                        </div>
                        <h1 className="text-5xl font-extrabold dark:text-white">{quiz.name}</h1>
                    </div>
                    {quiz.questions.map((question, index) => (
                        <Fragment key={index}>
                            <p className="text-lg text-center font-normal text-gray-500 dark:text-gray-400 my-4">{question["name"]}</p>
                            <div className="flex justify-center">
                                <div className="flex flex-col items-center mt-5 justify-center">
                                    <button
                                        className="relative   inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                                    <span
                                        className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    {question["option1"]}
                                  </span>
                                    </button>
                                </div>
                                <div className="flex flex-col  items-center mt-5 justify-center">
                                    <button
                                        className="relative   inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                                    <span
                                        className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                   {question["option2"]}
                                  </span>
                                    </button>
                                </div>
                                <div className="flex flex-col  items-center mt-5 justify-center">
                                    <button
                                        className="relative   inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                                    <span
                                        className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    {question["option3"]}
                                  </span>
                                    </button>
                                </div>
                                <div className="flex flex-col  items-center mt-5 justify-center">
                                    <button
                                        className="relative   inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800">
                                    <span
                                        className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                    {question["option4"]}
                                  </span>
                                    </button>
                                </div>
                            </div>
                        </Fragment>
                    ))}


                </div>
            </div>
        </section>

    );
};

export default QuizFront;
