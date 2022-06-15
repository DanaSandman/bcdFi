import  express, { Request, Response }  from 'express';
const { transferService } = require('./token.service');

export async function transferToken(req:Request, res:Response) {
    try {
        const data = req.body;
        const isTokenTransferred = await transferService(data);
        res.send(isTokenTransferred);
    } catch (err) {
        res.status(500).send({
            err: 'Failed to transfer tokens'
        });
    };
};
