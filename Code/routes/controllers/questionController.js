import * as questionService from "../../services/questionService.js";
import { validasaur } from "../../deps.js";

const questionValidationRules = {
  text: [validasaur.required, validasaur.minLength(1)]
};


const addQuestion = async ({ params, request, response, user, render }) => {
  const body = request.body({ type: "form" });
  const formData = await body.value;

  const data = {
    text: formData.get("question_text")
  }

  const [passes, errors] = await validasaur.validate(
    data,
    questionValidationRules,
  );

  if (!passes) {
    console.log(errors);
    render("questions.eta", { validationErrors: errors, topicId: params.id });
  } else {
    await questionService.addQuestion(
        user.id,
        params.id,
        data.text
    );
    response.redirect(`/topics/${params.id}`);
  }
};

const listQuestions = async ({ params, render }) => {
    render("questions.eta", { 
        questions: await questionService.listQuestionsByTopic(params.id),
        topicId: params.id
    });
};


const viewQuestion = async ({ params, render }) => {
  const question = await questionService.getQuestionById(params.qId);
  const answerOptions = await questionService.listAnswerOptionsByQuestion(params.qId);
  render("questionDetails.eta", {
      question: question, 
      answerOptions: answerOptions,
      questionId: params.qId,
      topicId: params.id
  });
};

const optionValidationRules = {
    option: [validasaur.required, validasaur.minLength(1)]
};

const addAnswerOption = async ({ params, request, response, render }) => {
    const body = request.body({ type: "form" });
    const formData = await body.value;
    const question = await questionService.getQuestionById(params.qId);
    const answerOptions = await questionService.listAnswerOptionsByQuestion(params.qId);
    

    const data = {
        option: formData.get("option_text"),
    }
    
    const [passes, errors] = await validasaur.validate(
        data,
        optionValidationRules,
    );

    if (!passes) {
    console.log(errors);
    render("questionDetails.eta", {
        validationErrors: errors,
        question: question, 
        answerOptions: answerOptions,
        questionId: params.qId,
      topicId: params.id
    });
    } else {

    const optionText = formData.get("option_text");
    const isCorrect = formData.has("is_correct");
    await questionService.addAnswerOption(params.qId, optionText, isCorrect);
    response.redirect(`/topics/${params.id}/questions/${params.qId}`);
    }
};

const deleteAnswerOption = async ({ params, response }) => {
    await questionService.deleteAnswerOption(params.oId);
    response.redirect(`/topics/${params.tId}/questions/${params.qId}`);
};

const deleteQuestion = async ({ params, response }) => {
    await questionService.deleteQuestion(params.qId);
    response.redirect(`/topics/${params.tId}`);
};


export { addQuestion, listQuestions, viewQuestion, addAnswerOption, deleteAnswerOption , deleteQuestion };