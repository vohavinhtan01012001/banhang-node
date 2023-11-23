import Joi, { Schema } from "joi";
import { Request, Response, NextFunction } from "express";
import multer from "multer";

const upload = multer();
const validateRequestProduct = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    upload.none()(req, res, (err: any) => {
      if (err) {
        res.status(400).json({ error: "Invalid form data" });
        return;
      }

      const { error } = schema.validate(req.body);
      const valid = error == null;

      if (valid) {
        next();
      } else {
        const { details, message } = error;
        const messages = details.map(i => i.message).join(",");

        console.log("error", messages);
        res.status(400).json({ error: messages, msg: message });
      }
    });
  };
};

export default validateRequestProduct;
