import { IsNotEmpty, IsString } from "class-validator";

export class AddSubCategoryToCourseDto {
    @IsNotEmpty()
    @IsString()
    courseId: string;
    @IsNotEmpty()
    @IsString()
    subCategoryId: string;
}