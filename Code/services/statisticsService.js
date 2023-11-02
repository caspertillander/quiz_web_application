import { sql } from "../database/database.js";

const countTopics = async () => {
    return await sql`SELECT COUNT(*) FROM topics`;
};

const countQuestions = async () => {
    return await sql`SELECT COUNT(*) FROM questions`;
};

const countAnswers = async () => {
    return await sql`SELECT COUNT(*) FROM question_answers`;
};

export {countAnswers, countQuestions, countTopics}