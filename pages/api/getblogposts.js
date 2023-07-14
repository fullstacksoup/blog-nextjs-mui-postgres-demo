import { sql } from '@vercel/postgres';

export default async function handler(req, res) {
  console.log('Handler');
  try {
    const { rows } = await sql`SELECT * FROM blogposts;`
    console.log('rows', rows);
    res.status(200).json(rows);

  } catch(error) {
    console.error(error);
  }  
}