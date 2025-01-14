import { Module } from '@nestjs/common';
import { SubcategoryController } from './subcategory.controller';
import { SubcategoryService } from './subcategory.service';
import { MongooseModule } from '@nestjs/mongoose';
import { SubCategory, SubCategorySchema } from 'src/schema/subcategory.schema';
import { Course, CourseSchema } from 'src/schema/course.schema';
import { Category, CategorySchema } from 'src/schema/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: SubCategory.name,
      schema: SubCategorySchema
    },
    {
      name: Course.name,
      schema: CourseSchema
    }, {
      name: Category.name,
      schema: CategorySchema
    },
    ])
  ],
  controllers: [SubcategoryController],
  providers: [SubcategoryService]
})
export class SubcategoryModule { }
