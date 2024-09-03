//* this API Router will be used to return call and user data

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

//* handle call data requests
export default async function handler(req : any, res : any) {
    const { method } = req // variable method stores the method of the request
    
    switch (method) {
        case 'GET' :
            try {
                const calls = await prisma.call.findMany() // find all calls
                res.status(200).json({success: true, data: calls}) // return calls in JSON format
            } catch {
                res.status(400).json({success : false, message: 'Error retrieving calls'}) // 400 indicates a bad request
            }
            break
        case 'POST' :
            try {
                const calls = await prisma.call.create({
                    data: req.body // create a new call with the data from the request
                })
                res.status(200).json({success: true, data: calls}) // return the new call in JSON format
            } catch {
                res.status(400).json({success : false, message: 'Error creating call'})
            }
            break
        case 'PUT' :
            try {
                const { id } = req.query // get the id of the call to update
                const calls = await prisma.call.update({
                    where: {id: String(id)}, // find the call by id
                    data: req.body // update the call with the data from the request
                })
                res.status(200).json({success: true, data: calls}) // return the updated call in JSON format
            } catch {
                res.status(400).json({success : false, message: 'Error updating call'})
            }
            break
        case 'DELETE' :
            try {
                const { id } = req.query
                const calls = await prisma.call.delete({
                    where: {id: String(id)} 
                })
                res.status(200).json({success: true, data: calls})
            } catch {
                res.status(400).json({success : false, message: 'Error deleting call'})
            }
            break
        default:
            res.status(400).json({success : false , message: 'Invalid request method'})
            break
    }
    
}