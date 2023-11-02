import { sql } from "../database/database.js";

const addQuestion = async (userId, topicId, questionText) => {
    await sql`INSERT INTO questions
        (user_id, topic_id, question_text)
          VALUES (${userId}, ${topicId}, ${questionText})`;
};

const listQuestionsByTopic = async (topicId) => {
    const rows = await sql`SELECT * FROM questions WHERE topic_id = ${topicId}`;
    return rows;
};

const getQuestionById = async (questionId) => {
    const rows = await sql`SELECT * FROM questions WHERE id = ${questionId}`;
    return rows;
};

const addAnswerOption = async (questionId, optionText, isCorrect) => {
    await sql`INSERT INTO question_answer_options
        (question_id, option_text, is_correct)
        VALUES (${questionId}, ${optionText}, ${isCorrect})`;
};

const listAnswerOptionsByQuestion = async (questionId) => {
    const rows = await sql`SELECT * FROM question_answer_options WHERE question_id = ${questionId}`;
    return rows;
};

const deleteAnswerOption = async (optionId) => {
    await sql`DELETE FROM question_answers WHERE question_answer_option_id = ${optionId}`
    await sql`DELETE FROM question_answer_options WHERE id = ${optionId}`;
};

const deleteQuestion = async (qId) => {
    await sql`DELETE FROM question_answers WHERE question_id = ${qId}`
    await sql`DELETE FROM question_answer_options WHERE question_id = ${qId}`;
    await sql`DELETE FROM questions WHERE id = ${qId}`;
};

export { addQuestion, listQuestionsByTopic, addAnswerOption, listAnswerOptionsByQuestion, deleteAnswerOption, deleteQuestion, getQuestionById };