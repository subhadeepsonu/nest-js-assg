import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from 'src/schema/course.schema';
import { CreateCourseDto } from './dto/CreateCourse.dto';
import { UpdateCourseDto } from './dto/UpdateCourse.dto';
import { AddSubCategoryToCourseDto } from './dto/addSubCategoryToCourse.dto';
import { SubCategory } from 'src/schema/subcategory.schema';
import { RemoveSubCategoryFromCourseDto } from './dto/removeSubCategoryFromCourse.dto';

@Injectable()
export class CourseService {
    constructor(@InjectModel(Course.name) private courseModel: Model<Course>, @InjectModel(SubCategory.name) private subCategoryModel: Model<SubCategory>) { }

    async findAll() {
        try {
            return await this.courseModel.find().exec();
        } catch (error) {
            throw new InternalServerErrorException('Failed to fetch courses. Please try again later.');
        }
    }

    async findById(id: string) {
        try {
            const data = await this.courseModel.findById(id).exec();
            if (!data) {
                throw new NotFoundException('Course not found');
            }
            return data;
        } catch (error) {
            throw new NotFoundException('Invalid ID or Course not found');
        }
    }
    async creteCourse(createCourse: CreateCourseDto) {
        try {
            await this.courseModel.create({
                name: createCourse.name
            })
            return {
                message: "course created"
            }
        } catch (error) {
            throw new InternalServerErrorException()
        }
    }
    async updateCourse(updateCourse: UpdateCourseDto, id: string) {
        try {
            const course = await this.courseModel.findById(id)
            if (!course) {
                throw new NotFoundException('Invalid ID or Course not found');
            }
            await this.courseModel.findByIdAndUpdate(id, {
                name: updateCourse.name
            })
            return {
                message: "course updated"
            }
        } catch (error) {
            throw new NotFoundException('Invalid ID or Course not found');
        }
    }
    async deleteCourse(id: string) {
        try {
            await this.courseModel.findByIdAndDelete(id)
            return {
                message: "course deleted"
            }
        } catch (error) {
            throw new NotFoundException('Invalid ID or Course not found');
        }
    }
    async addSubCategoryToCourse(addSubcategoryTocourseDto: AddSubCategoryToCourseDto) {
        try {
            const data = await this.subCategoryModel.findById(addSubcategoryTocourseDto.subCategoryId)
            if (!data) {
                throw new NotFoundException("sub category not  found")
            }
            const course = await this.courseModel.findById(addSubcategoryTocourseDto.courseId)
            if (!course) {
                throw new NotFoundException()
            }
            await this.courseModel.findByIdAndUpdate(addSubcategoryTocourseDto.courseId, {
                $push: {
                    subCategory: addSubcategoryTocourseDto.subCategoryId
                }
            })
            await this.subCategoryModel.findByIdAndUpdate(addSubcategoryTocourseDto.subCategoryId, {
                $push: {
                    courses: addSubcategoryTocourseDto.courseId
                }
            })
            return {
                message: "subcatgory added"
            }

        } catch (error) {
            throw new InternalServerErrorException()
        }
    }
    async removeSubCategoryFromCourse(removeSubCategoryFromCourseDto: RemoveSubCategoryFromCourseDto) {
        try {
            const data = await this.subCategoryModel.findById(removeSubCategoryFromCourseDto.subCategoryId)
            if (!data) {
                throw new NotFoundException()
            }
            const course = await this.courseModel.findById(removeSubCategoryFromCourseDto.courseId)
            if (!course) {
                throw new NotFoundException()
            }
            await this.courseModel.findByIdAndUpdate(removeSubCategoryFromCourseDto.courseId, {
                $push: {
                    subCategory: removeSubCategoryFromCourseDto.subCategoryId
                }
            })
            await this.subCategoryModel.findByIdAndUpdate(removeSubCategoryFromCourseDto.subCategoryId, {
                $push: {
                    courses: removeSubCategoryFromCourseDto.courseId
                }
            })

        } catch (error) {
            throw new InternalServerErrorException()
        }
    }
}
