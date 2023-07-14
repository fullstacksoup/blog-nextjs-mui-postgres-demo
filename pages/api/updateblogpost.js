import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  const method = req.method;
  const { id, title, body } = JSON.parse(req.body);
  
  try {
   
    const { rows } = await sql`UPDATE blogposts SET title = ${title}, body = ${body} WHERE id = ${id} RETURNING *;`        
    res.status(200).json(rows);
    
  } catch(error) {
    console.error(error);
  }
}

