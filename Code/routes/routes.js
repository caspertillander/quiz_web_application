import { Router } from "../deps.js";
import * as mainController from "./controllers/mainController.js";
import * as topicsController from "./controllers/topicsController.js";
import * as questionController from "./controllers/questionController.js";
import * as loginController from "./controllers/loginController.js";
import * as registrationController from "./controllers/registrationController.js";
import * as quizController from "./controllers/quizController.js";
import * as questionApi from "./apis/questionApi.js";
import * as answerApi from "./apis/answerApi.js";

const router = new Router();

router.get("/", mainController.showMain);
router.get("/topics", topicsController.listTopics)
router.post("/topics", topicsController.addTopic)

router.get("/auth/register", registrationController.showRegistrationForm);
router.post("/auth/register", registrationController.registerUser);

router.get("/auth/login", loginController.showLoginForm);
router.post("/auth/login", loginController.processLogin);

router.post("/topics/:id/delete", topicsController.deleteTopic)
router.get("/topics/:id", questionController.listQuestions)
router.post("/topics/:id/questions", questionController.addQuestion)
router.post('/topics/:tId/questions/:qId/delete', questionController.deleteQuestion);

router.get("/topics/:id/questions/:qId", questionController.viewQuestion);
router.post("/topics/:id/questions/:qId/options", questionController.addAnswerOption); 
router.post("/topics/:tId/questions/:qId/options/:oId/delete", questionController.deleteAnswerOption);


router.get("/quiz", quizController.listTopics);
router.get("/quiz/:tId", quizController.chooseRandomQuestion);
router.get("/quiz/:tId/questions/:qId", quizController.showQuestion)
router.post("/quiz/:tId/questions/:qId/options/:oId", quizController.handleAnswer)
router.get("/quiz/:tId/questions/:qId/correct", quizController.renderCorrect)
router.get("/quiz/:tId/questions/:qId/incorrect", quizController.renderIncorrect)

router.get("/api/questions/random", questionApi.makeQuestionApi)
router.post("/api/questions/answer", answerApi.checkAnswer)

export { router };

