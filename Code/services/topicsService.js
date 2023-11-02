import { sql } from "../database/database.js";

const addTopics = async (userId, name) => {
    await sql`INSERT INTO topics
        (user_id, name)
          VALUES (${userId}, ${name})`;
  };

const listTopics = async () => {
    const rows = await sql`SELECT * FROM topics`;
  
    return rows;
  };

  const deleteTopic = async (topicId) => {
    await sql.begin(async (transaction) => {

        await transaction`DELETE FROM question_answers WHERE question_id IN (SELECT id FROM questions WHERE topic_id = ${topicId})`;
        
        await transaction`DELETE FROM question_answer_options WHERE question_id IN (SELECT id FROM questions WHERE topic_id = ${topicId})`;
        
        await transaction`DELETE FROM questions WHERE topic_id = ${topicId}`;
        
        await transaction`DELETE FROM topics WHERE id = ${topicId}`;
    });
};


export { addTopics, listTopics, deleteTopic };

