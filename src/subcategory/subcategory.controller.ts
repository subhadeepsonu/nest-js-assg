
import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { CreateSubCategoryDto } from './dto/createSubCategory.dto';
import { UpdateSubCategoryDto } from './dto/updateSubcategory.dto';
@Controller('subcategory')
export class SubcategoryController {
    constructor(private readonly subcategorySchema: SubcategoryService) { }
    @Get()
    findAll() {
        return this.subcategorySchema.findAll()
    }
    @Get(':id')
    findByID(@Param('id') id: string) {
        return this.subcategorySchema.findById(id)
    }
    @Post()
    addSubCategory(@Body() createSubCategoryDto: CreateSubCategoryDto) {
        return this.subcategorySchema.createSubCategory(createSubCategoryDto)
    }
    @Patch(":id")
    updateSubCategory(@Param('id') id: string, @Body() updateSubCategoryDto: UpdateSubCategoryDto) {
        return this.subcategorySchema.updateSubCategory(updateSubCategoryDto, id)
    }
    @Delete(":id")
    deleteSubCategory(@Param("id") id: string) {
        return this.subcategorySchema.deleteSubCategory(id)
    }
}
