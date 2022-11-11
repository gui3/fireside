import { NextFunction, Request, RequestHandler, Response } from "express";


export default function async_wrap (func: RequestHandler) {
	return (req: Request, res: Response, next: NextFunction) => Promise
	.resolve(func(req,res,next))
	.catch(next)
}