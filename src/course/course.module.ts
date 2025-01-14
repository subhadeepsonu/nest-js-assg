import { Module } from '@nestjs/common';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseSchema, Course } from 'src/schema/course.schema';
import { SubCategory, SubCategorySchema } from 'src/schema/subcategory.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Course.name,
      schema: CourseSchema
    }, {
      name: SubCategory.name,
      schema: SubCategorySchema
    }])
  ],
  controllers: [CourseController],
  providers: [CourseService]
})
export class CourseModule { }
