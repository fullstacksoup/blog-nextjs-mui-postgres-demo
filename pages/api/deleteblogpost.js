import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  const method = req.method;
  const { id } = JSON.parse(req.body);
  console.error('handler', id, method, req.body);
  try {
   
    const { rows } = await sql`DELETE FROM blogposts WHERE ID = ${id} RETURNING *;`
        
    res.status(200).json(rows);

  } catch(error) {
    console.error(error);
  }
  
}

