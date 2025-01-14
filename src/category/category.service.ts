import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from 'src/schema/category.schema';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';
import { AddCourseToCategoryDto } from './dto/addCourseToCategory.dto';
import { RemoveCourseFromCategoryDto } from './dto/removeCourseFromCategory.dto';
import { Course } from 'src/schema/course.schema';
import { AddSubCategoryToCategoryDto } from './dto/addSubCategoryToCatrgory.dto';
import { RemoveSubCategoryFromCategoryDto } from './dto/removeSubCategoryFromCategory.dto';
import { SubCategory } from 'src/schema/subcategory.schema';

@Injectable()
export class CategoryService {
    constructor(@InjectModel(Category.name) private categoryModel: Model<Category>, @InjectModel(Course.name) private courseModel: Model<Course>, @InjectModel(SubCategory.name) private SubCategoryModel: Model<SubCategory>) { }
    async findAll() {
        try {
            return await this.categoryModel.find().populate(["subCategories", "courses"])

        } catch (error) {

            throw new InternalServerErrorException('Failed to fetch categories. Please try again later.');
        }
    }
    async findAllList() {
        try {

            const result = await this.categoryModel.aggregate([
                {
                    $project: {
                        name: 1,
                        numberOfSubcategories: { $size: "$subCategories" }
                    }
                }
            ]);
            return result

        } catch (error) {
            console.log(error)
            throw new InternalServerErrorException('Failed to . Please try again later.');
        }
    }
    async findById(id: number) {
        try {

            const data = await this.categoryModel.findById(id)
            if (!data) {
                throw new NotFoundException("category not found")
            }
            return data
        } catch (error) {
            throw new NotFoundException('Invalid ID or Course not found');
        }
    }
    async createCategory(createCategoryDto: CreateCategoryDto) {
        try {
            await this.categoryModel.create({
                name: createCategoryDto.name
            })
            return {
                message: "Category created successfully"
            }

        } catch (error) {
            throw new InternalServerErrorException('Failed to create category. Please try again later.');
        }
    }
    async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
        try {
            const data = await this.categoryModel.findById(id)
            if (!data) {
                throw new NotFoundException("category not found")
            }
            await this.categoryModel.findByIdAndUpdate(id, {
                name: updateCategoryDto.name
            })
            return {
                message: "Category updated successfully"
            }
        } catch (error) {
            throw new InternalServerErrorException('Failed to update category. Please try again later.');
        }

    }
    async deleteCategory(id: string) {
        try {
            await this.categoryModel.findByIdAndDelete(id)
            return {
                message: "Category deleted successfully"
            }
        } catch (error) {
            throw new InternalServerErrorException('Failed to delete category. Please try again later.');
        }
    }

    async addCourseToCategory(addCourseToCategoryDto: AddCourseToCategoryDto) {
        try {
            const course = await this.courseModel.findById(addCourseToCategoryDto.courseId)
            if (!course) {
                throw new NotFoundException("Course not found")
            }
            const category = await this.categoryModel.findById(addCourseToCategoryDto.categoryId)
            if (!category) {
                throw new NotFoundException("category not found")
            }
            await this.categoryModel.findByIdAndUpdate(addCourseToCategoryDto.categoryId, {
                $push: {
                    courses: addCourseToCategoryDto.courseId
                }
            })
            await this.courseModel.findByIdAndUpdate(addCourseToCategoryDto.courseId, {
                $push: {
                    category: addCourseToCategoryDto.categoryId
                }
            })
            return {
                message: "Course added to category"
            }
        } catch (error) {
            throw new InternalServerErrorException('Failed to add course to category. Please try again later.');
        }
    }
    async removeCourseFromCategory(removeCourseFromCategoryDto: RemoveCourseFromCategoryDto) {
        try {
            const course = await this.courseModel.findById(removeCourseFromCategoryDto.courseId)
            if (!course) {
                throw new NotFoundException("Course not found")
            }
            const category = await this.categoryModel.findById(removeCourseFromCategoryDto.categoryId)
            if (!category) {
                throw new NotFoundException()
            }
            await this.courseModel.findByIdAndUpdate(removeCourseFromCategoryDto.courseId, {
                $pull: {
                    category: removeCourseFromCategoryDto.categoryId
                }
            })
            await this.categoryModel.findByIdAndUpdate(removeCourseFromCategoryDto.categoryId, {
                $pull: {
                    courses: removeCourseFromCategoryDto.courseId
                }
            })
            return {
                message: "Course removed from category"
            }
        } catch (error) {
            throw new InternalServerErrorException('Failed to remove course from category. Please try again later.');
        }

    }
    async addSubCategoryToCategory(addSubCategoryToCategoryDto: AddSubCategoryToCategoryDto) {
        try {
            const data = await this.SubCategoryModel.findById(addSubCategoryToCategoryDto.subCategoryId)
            if (!data) {
                throw new NotFoundException("Sub Category not found")
            }
            const category = await this.categoryModel.findById(addSubCategoryToCategoryDto.categoryId)
            if (!category) {
                throw new NotFoundException()
            }
            await this.categoryModel.findByIdAndUpdate(addSubCategoryToCategoryDto.categoryId, {
                $push: {
                    subCategories: addSubCategoryToCategoryDto.subCategoryId
                }
            })
            await this.SubCategoryModel.findByIdAndUpdate(addSubCategoryToCategoryDto.subCategoryId, {
                $push: {
                    category: addSubCategoryToCategoryDto.categoryId
                }
            })
            return {
                message: "Sub Category added to category"
            }

        } catch (error) {
            throw new InternalServerErrorException('Failed to add sub category to category. Please try again later.');
        }
    }
    async removeSubCategoryFromCategory(removeSubCategoryFromCategoryDto: RemoveSubCategoryFromCategoryDto) {
        try {
            const data = await this.SubCategoryModel.findById(removeSubCategoryFromCategoryDto.subCategoryId)
            if (!data) {
                throw new NotFoundException("Sub Category not found")
            }
            const category = await this.categoryModel.findById(removeSubCategoryFromCategoryDto.categoryId)
            if (!category) {
                throw new NotFoundException()
            }
            await this.SubCategoryModel.findByIdAndUpdate(removeSubCategoryFromCategoryDto.subCategoryId, {
                $pull: {
                    category: removeSubCategoryFromCategoryDto.categoryId
                }
            })
            await this.categoryModel.findByIdAndUpdate(removeSubCategoryFromCategoryDto.categoryId, {
                $pull: {
                    subCategories: removeSubCategoryFromCategoryDto.subCategoryId
                }
            })
            return {
                message: "Sub Category removed from category"
            }

        } catch (error) {
            throw new InternalServerErrorException('Failed to remove sub category from category. Please try again later.');
        }
    }



}
