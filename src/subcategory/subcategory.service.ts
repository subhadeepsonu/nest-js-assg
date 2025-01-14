import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubCategory } from 'src/schema/subcategory.schema';
import { CreateSubCategoryDto } from './dto/createSubCategory.dto';
import { Category } from 'src/schema/category.schema';
import { Course } from 'src/schema/course.schema';
import { UpdateSubCategoryDto } from './dto/updateSubcategory.dto';

@Injectable()
export class SubcategoryService {
    constructor(@InjectModel(Category.name) private categoryModel: Model<Category>, @InjectModel(Course.name) private courseModel: Model<Course>, @InjectModel(SubCategory.name) private subCategoryModel: Model<SubCategory>) { }
    async findAll() {
        try {
            return await this.subCategoryModel.find()
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }
    async findById(id: string) {
        try {
            return this.subCategoryModel.findById(id)
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }

    async createSubCategory(createSubCategoryDto: CreateSubCategoryDto) {
        try {
            await this.subCategoryModel.create({
                name: createSubCategoryDto.name
            })
            return {
                message: "sub category created"
            }
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }
    async updateSubCategory(updateSubCategoryDto: UpdateSubCategoryDto, id: string) {
        try {
            const subCategory = await this.subCategoryModel.findById(id)
            if (!subCategory) {
                throw new NotFoundException()
            }
            await this.subCategoryModel.findByIdAndUpdate(id, {
                name: updateSubCategoryDto.name
            })
            return {
                message: "update category"
            }

        } catch (error) {
            throw new InternalServerErrorException()
        }
    }
    async deleteSubCategory(id: string) {
        try {
            await this.subCategoryModel.findByIdAndDelete(id)
            await this.courseModel.updateMany(
                {

                },
                {
                    $pull: {
                        subCategory: id
                    }
                }
            )
            await this.categoryModel.updateMany(
                {

                },
                {
                    $pull: {
                        subCategories: id
                    }
                }
            )

        } catch (error) {
            throw new InternalServerErrorException()
        }
    }

}
