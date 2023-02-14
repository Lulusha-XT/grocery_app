import { response } from "express";
import MONGO_DB_CONFIG from "../config/app.config";
import category, { Category } from "../models/category.model";

export class CategoryStore {
  async createCategory(params: Category): Promise<any> {
    try {
      if (!params.category_name) {
        throw {
          message: "Category Name Required",
        };
      }

      const model = new category(params);
      const response = await model.save();
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getCategory(params: any): Promise<any> {
    try {
      const category_name = params.category_name;
      var condition = category_name
        ? {
            category_name: { $regex: new RegExp(category_name), $options: "i" },
          }
        : {};

      let perPage = Math.abs(params.pageSize) || MONGO_DB_CONFIG.PAGE_SIZE;
      let page = (Math.abs(params.page) || 1) - 1;

      const response = await category
        .find(condition, "category_name category_image")
        .limit(perPage)
        .skip(perPage * page);

      return response;
    } catch (error) {
      throw error;
    }
  }

  async getCategoryById(params: any): Promise<any> {
    try {
      const categoryId = params.categoryId;
      const response = await category.findById(categoryId);

      if (!response) throw "Not Found Category with id" + categoryId;
      else return response;
    } catch (error) {
      throw error;
    }
  }

  async updateCategory(params: any): Promise<any> {
    try {
      const categoryId = params.categoryId;
      const response = await category.findByIdAndUpdate(categoryId, params, {
        useFindAndModify: false,
      });

      if (!response) throw "Not Found Category with id" + categoryId;
      else return response;
    } catch (error) {
      throw error;
    }
  }

  async deleteCategory(params: any): Promise<any> {
    try {
      const categoryId = params.categoryId;
      const response = await category.findByIdAndDelete(categoryId);

      if (!response) throw "Not Found Category with id" + categoryId;
      else return response;
    } catch (error) {
      throw error;
    }
  }
}
