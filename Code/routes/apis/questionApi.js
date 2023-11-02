import * as quizService from "../../services/quizService.js";

const makeQuestionApi = async ({ response }) => {
    const question = await quizService.chooseRandomQuestionAnyTopic();
    const questionId = question.id;
    const options = await quizService.getOptionsById(questionId);

    const transformedResponse = {
        questionId: question.id,
        questionText: question.question_text,
        answerOptions: options.map(option => ({
          optionId: option.id,
          optionText: option.option_text
        }))
      };
    
      response.body = transformedResponse;
};

export { makeQuestionApi };