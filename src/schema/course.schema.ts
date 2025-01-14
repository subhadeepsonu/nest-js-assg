import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import mongoose from "mongoose"
import { SubCategorySchema } from "./subcategory.schema"
@Schema()
export class Course {
    @Prop({ required: true })
    name: string
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }] })
    category: []
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: "SubCategory" }] })
    subCategory: typeof SubCategorySchema[]
}

export const CourseSchema = SchemaFactory.createForClass(Course)
