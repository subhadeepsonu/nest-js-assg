import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/CreateCourse.dto';
import { UpdateCourseDto } from './dto/UpdateCourse.dto';
import { AddSubCategoryToCourseDto } from './dto/addSubCategoryToCourse.dto';
import { RemoveSubCategoryFromCourseDto } from './dto/removeSubCategoryFromCourse.dto';

@Controller('course')
export class CourseController {
    constructor(private readonly courseService: CourseService) { }
    @Get()
    findAll() {
        return this.courseService.findAll()
    }

    @Get(':id')
    findByID(@Param('id') id: string) {
        return this.courseService.findById(id)
    }

    @Post()
    createCourse(@Body() createCourseDto: CreateCourseDto) {
        return this.courseService.creteCourse(createCourseDto)
    }
    @Patch("/addSubCategory")
    addSubcategoryTocourse(@Body() addSubcategoryTocourseDto: AddSubCategoryToCourseDto) {
        return this.courseService.addSubCategoryToCourse(addSubcategoryTocourseDto)
    }
    @Patch("/removeSubCategory")
    removeSubCategoryFromCourse(@Body() removeSubCategoryFromCourse: RemoveSubCategoryFromCourseDto) {
        return this.courseService.removeSubCategoryFromCourse(removeSubCategoryFromCourse)
    }
    @Patch(":id")
    updateCourse(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
        return this.courseService.updateCourse(updateCourseDto, id)
    }
    @Delete(":id")
    deleteCourse(@Param('id') id: string) {
        return this.courseService.deleteCourse(id)
    }

}
