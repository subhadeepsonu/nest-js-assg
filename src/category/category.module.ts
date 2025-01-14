import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/schema/category.schema';
import { SubCategory, SubCategorySchema } from 'src/schema/subcategory.schema';
import { Course, CourseSchema } from 'src/schema/course.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Category.name,
      schema: CategorySchema
    },
    {
      name: SubCategory.name,
      schema: SubCategorySchema
    },
    {
      name: Course.name,
      schema: CourseSchema
    }
    ])
  ],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule { }
