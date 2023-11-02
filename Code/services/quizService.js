import { sql } from "../database/database.js";

const chooseRandomQuestion = async (topicId) => {
    const rows = await sql`SELECT * FROM questions WHERE topic_id = ${topicId} ORDER BY RANDOM() LIMIT 1`;
    return rows[0];
};

const qetQuestionById = async (questionId) => {
    const rows = await sql`SELECT * FROM questions WHERE id = ${questionId}`;
    return rows;
};

const getOptionsById = async (questionId) => {
    const rows = await sql`SELECT * FROM question_answer_options WHERE question_id = ${questionId}`;
    return rows;
};

const getOptionsByOptionId = async (optionId) => {
    const rows = await sql`SELECT * FROM question_answer_options WHERE id = ${optionId}`;
    return rows;
};

const saveAnswer = async (userId, questionId, optionsId) => {
    await sql`INSERT INTO question_answers
        (user_id, question_id, question_answer_option_id)
          VALUES (${userId}, ${questionId}, ${optionsId})`;
};

const chooseRandomQuestionAnyTopic = async () => {
    const rows = await sql`SELECT * FROM questions ORDER BY RANDOM() LIMIT 1`;
    return rows[0];
};

export { chooseRandomQuestion , qetQuestionById, getOptionsById, saveAnswer, getOptionsByOptionId, chooseRandomQuestionAnyTopic }