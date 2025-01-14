import { IsNotEmpty, IsString } from "class-validator";

export class RemoveSubCategoryFromCourseDto {
    @IsNotEmpty()
    @IsString()
    courseId: string;
    @IsNotEmpty()
    @IsString()
    subCategoryId: string;
}