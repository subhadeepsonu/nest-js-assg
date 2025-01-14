import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Course } from "./course.schema";
import { SubCategory } from "./subcategory.schema";

@Schema()
export class Category {
    @Prop({ required: true })
    name: string

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }] })
    courses: Course[]

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" }] })
    subCategories: SubCategory[]

}
export const CategorySchema = SchemaFactory.createForClass(Category)