import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CourseModule } from './course/course.module';
import { CategoryModule } from './category/category.module';
import { SubcategoryModule } from './subcategory/subcategory.module';

@Module({
  imports: [MongooseModule.forRoot("your db url"), CourseModule, CategoryModule, SubcategoryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
