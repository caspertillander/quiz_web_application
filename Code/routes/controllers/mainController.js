import * as statisticsService from "../../services/statisticsService.js";

const showMain = async ({ render }) => {
  const data = {
    topics: await statisticsService.countTopics(),
    questions: await statisticsService.countQuestions(),
    answers: await statisticsService.countAnswers(),
  }
  render("main.eta", data);
};

export { showMain };
