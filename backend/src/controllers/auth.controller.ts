import express, { Request, Response, NextFunction } from 'express';

export const loginController = async (req:Request, res:Response, next:NextFunction) =>{
    return res.status(200).json({
        method:"Login"
    })
}