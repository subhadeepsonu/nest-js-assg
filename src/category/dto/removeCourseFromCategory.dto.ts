import { IsNotEmpty, IsString } from "class-validator";

export class RemoveCourseFromCategoryDto {
    @IsNotEmpty()
    @IsString()
    courseId: string;

    @IsNotEmpty()
    @IsString()
    categoryId: number;
}
