import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { UpdateCategoryDto } from './dto/updateCategory.dto';
import { AddCourseToCategoryDto } from './dto/addCourseToCategory.dto';
import { RemoveCourseFromCategoryDto } from './dto/removeCourseFromCategory.dto';
import { AddSubCategoryToCategoryDto } from './dto/addSubCategoryToCatrgory.dto';
import { RemoveSubCategoryFromCategoryDto } from './dto/removeSubCategoryFromCategory.dto';

@Controller('category')
export class CategoryController {
    constructor(private readonly categoryService: CategoryService) { }
    @Get()
    findAll() {
        return this.categoryService.findAll()
    }

    @Get("list")
    findAllList() {
        return this.categoryService.findAllList()
    }

    @Get(':id')
    findByID(@Param('id') id: string) {
        return this.categoryService.findById(+id)
    }

    @Post()
    addCategory(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoryService.createCategory(createCategoryDto)
    }

    @Patch("/addCourse")
    addCourseToCategory(@Body() addCourseToCategoryDto: AddCourseToCategoryDto) {
        return this.categoryService.addCourseToCategory(addCourseToCategoryDto)
    }
    @Patch("/removeCourse")
    removeCourseFromCategory(@Body() removeCourseFromCategory: RemoveCourseFromCategoryDto) {
        return this.categoryService.removeCourseFromCategory(removeCourseFromCategory)
    }
    @Patch("/addSubCategory")
    addSubCategory(@Body() addSubCategoryToCategory: AddSubCategoryToCategoryDto) {
        return this.categoryService.addSubCategoryToCategory(addSubCategoryToCategory)
    }
    @Patch("/removeSubCategory")
    removeSubCategoryFromCategory(@Body() removeSubCategoryFromCategory: RemoveSubCategoryFromCategoryDto) {
        return this.categoryService.removeSubCategoryFromCategory(removeSubCategoryFromCategory)
    }
    @Patch(":id")
    updateCategory(@Param("id") id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
        return this.categoryService.updateCategory(id, updateCategoryDto)
    }
    @Delete(":id")
    deleteCategory(@Param('id') id: string) {
        return this.categoryService.deleteCategory(id)
    }

}
