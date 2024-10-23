import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default async function handler(req, res) {
    if (req.method === 'GET') {
        try{
            const calls = await prisma.call.findMany();
            res.status(200).json(calls); // 200 indicates calls have been fetched successfully
        } catch (error) {
        res.status(500).json({error: "Failed to fetch calls"}) // server-side error
        } 
    } else {
        res.setHeader('Allow', ['GET']); // specifies API requests that are allowed
        res.status(405).end(`Method ${req.method} Not Allowed`); // bad request
    }
}


