import axios from "axios";

const apiURL = "http://127.0.0.1:8000/api/quiz";


export async function getQuizs() {
    try {
        const response = await axios.get(`${apiURL}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}



export async function addQuiz(quizData) {
    try {
        const response = await axios.post(`${apiURL}/addQuiz`, quizData);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export async function getTournamentQuizes(id) {
    try {
        const response = await axios.get(`${apiURL}/getQuizes/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
export async function updateQuiz(quizData) {
    try {
        const response = await axios.put(
            `${apiURL}`,
            quizData
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export async function deleteQuiz(id) {
    try {
        const response = await axios.delete(`${apiURL}/${id}`);
        console.log(response);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function getQuizInfo(id) {
    try {
        const response = await axios.get(`${apiURL}/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}