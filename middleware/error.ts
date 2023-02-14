import express, { Request, Response } from "express";

const errorHandler = (
  err: Error,
  _req: Request,
  res: Response,
  next: Function
) => {
  if (typeof err === "string") {
    // custom application error
    return res.status(400).json({ message: err });
  }

  if (err.name === "validationError") {
    // mongoose validation error
    return res.status(400).json({ message: err.message });
  }

  if (err.name === "UnauthorizationError") {
    // jwt authentication error
    return res.status(401).json({ message: "Token not valid" });
  }
  return res.status(500).json({ messag: err.message });
};

export default errorHandler;
