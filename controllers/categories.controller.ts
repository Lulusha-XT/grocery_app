import express, { Request, Response, Router } from "express";

const routes = express.Router();

import { CategoryStore } from "../services/categories.services";
import upload from "../middleware/category.upload";

import { Category as CategoryType } from "../models/category.model";

const categorys = new CategoryStore();

const create = async (req: Request, res: Response, next: Function) => {
  try {
    await upload(req, res, (err) => {
      if (err) {
        throw err;
      }
    });

    const path = req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";

    const model: CategoryType = {
      category_name: req.body.category_name as string,
      category_description: req.body.category_description as string,
      category_image: (path != "" ? "/" + path : "") as string,
    };
    console.log(model);

    const result = await categorys.createCategory(model);

    return res.status(200).send({
      message: "Success",
      data: result,
    });
  } catch (error) {
    return next(error);
  }
};

const findAll = async (req: Request, res: Response, next: Function) => {
  try {
    const model: any = {
      category_name: req.query.category_name,
      pageSize: req.query.pageSize,
      page: req.query.page,
    };

    const result = await categorys.getCategory(model);

    return res.status(200).send({
      message: "Success",
      data: result,
    });
  } catch (error) {
    return next(error);
  }
};

// api/category/id

const findOne = async (req: Request, res: Response, next: Function) => {
  try {
    const model: any = {
      categoryId: req.params.id,
    };

    const result = await categorys.getCategoryById(model);

    return res.status(200).send({
      message: "Success",
      data: result,
    });
  } catch (error) {
    return next(error);
  }
};

const update = async (req: Request, res: Response, next: Function) => {
  try {
    await upload(req, res, (err) => {
      if (err) {
        throw err;
      }
    });

    const path = req.file != undefined ? req.file.path.replace(/\\/g, "/") : "";

    const model: any = {
      categoryId: req.params.id,
      category_name: req.body.category_name,
      category_description: req.body.category_description,
      category_image: path != "" ? "/" + path : "",
    };

    const result = await categorys.updateCategory(model);

    return res.status(200).send({
      message: "Success",
      data: result,
    });
  } catch (error) {
    return next(error);
  }
};

const deleteOne = async (req: Request, res: Response, next: Function) => {
  try {
    const model: any = {
      categoryId: req.params.id,
    };

    const result = await categorys.deleteCategory(model);

    return res.status(200).send({
      message: "Success",
      data: result,
    });
  } catch (error) {
    return next(error);
  }
};

const category_router = (router: Router) => {
  router.post("/category", create);
  router.get("/category", findAll);
  router.get("/category:id", findOne);
  router.put("/category:id", update);
  router.delete("/category:id", deleteOne);
};

export default category_router;
