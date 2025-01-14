import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Course } from "./course.schema";
import { Category } from "./category.schema";
@Schema()
export class SubCategory {
    @Prop({ required: true })
    name: string

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }] })
    courses: Course[]

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }] })
    categories: Category[]
}

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory)
