import * as quizService from "../../services/quizService.js";

const checkAnswer = async ({ request, response }) => {
    const body = request.body({ type: "json" });
    const content = await body.value;

    const questionId = content.questionId;
    const optionId = content.optionId;
    const answerOptions = await quizService.getOptionsById(questionId);
    const answer = await quizService.getOptionsByOptionId(optionId);

    let correctOption = {};
    for (let i = 0; i < answerOptions.length; i++) {
        if (answerOptions[i].is_correct) {
            correctOption = answerOptions[i];
            break;
        }
      }

    let correct = false;

    if (correctOption.id === answer[0].id) {
        correct = true;
    }
    
    response.body = { correct: correct };
  };

export { checkAnswer };