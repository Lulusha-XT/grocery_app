import mongoose, { Schema, Document } from "mongoose";

export interface Category {
  category_name: string;
  category_description: string;
  category_image: string;
}

const CategorySchema: Schema = new Schema({
  category_name: { type: String, required: true, unique: true },
  category_description: { type: String, required: true },
  category_image: { type: String, required: true },
});
export default mongoose.model<Category>("Category", CategorySchema);
