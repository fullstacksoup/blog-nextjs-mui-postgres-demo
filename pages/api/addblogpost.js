import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  const method = req.method;
  const { title, body } = JSON.parse(req.body);
  
  try {
   
    const { rows } = await sql`INSERT INTO blogposts (title, body) VALUES (${title}, ${body}) RETURNING *;`
        
    res.status(200).json(rows);

  } catch(error) {
    console.error(error);
  }
  
}

