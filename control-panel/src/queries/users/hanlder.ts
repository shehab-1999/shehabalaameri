import { NextApiRequest, NextApiResponse } from 'next';
import { authenticate } from '@/queries/users/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const user = await authenticate(req.body);
      res.status(200).json(user);
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Error during login' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}