import * as topicsService from "../../services/topicsService.js";
import * as quizService from "../../services/quizService.js";

const listTopics = async ({ render }) => {
    render("quiz.eta", { topics: await topicsService.listTopics() });
};

const chooseRandomQuestion = async ({params, response}) => {
    const randomQuestion = await quizService.chooseRandomQuestion(params.tId);
    const questionId = randomQuestion.id;
    response.redirect(`/quiz/${params.tId}/questions/${questionId}`);
};

const showQuestion = async ({params, render}) => {
    const questionId = params.qId;
    const question = await quizService.qetQuestionById(questionId);
    const answerOptions = await quizService.getOptionsById(questionId);
    render("question.eta", { 
        question: question[0],
        answerOptions: answerOptions
    });
};

const handleAnswer = async ({params, response, user}) => {
    const questionId = params.qId;
    const optionsId = params.oId;
    const answerOption = await quizService.getOptionsByOptionId(optionsId);
    await quizService.saveAnswer(user.id, questionId, optionsId);
    if (answerOption[0].is_correct) {
        response.redirect(`/quiz/${params.tId}/questions/${questionId}/correct`);
    } else {
        response.redirect(`/quiz/${params.tId}/questions/${questionId}/incorrect`);
    }
};

const renderCorrect = async ({params, render}) => {
    const topicId = params.tId;
    render("correct.eta", {topicId: topicId})
};

const renderIncorrect = async ({params, render}) => {
    const topicId = params.tId;
    const questionId = params.qId;

    const answerOption = await quizService.getOptionsById(questionId);

    const correctAnswer = answerOption.find(option => option.is_correct === true);

    render("incorrect.eta", {topicId: topicId, option: correctAnswer});
};


export { listTopics, chooseRandomQuestion, showQuestion, handleAnswer, renderCorrect, renderIncorrect };