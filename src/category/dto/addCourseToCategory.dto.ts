import { IsNotEmpty, IsString } from "class-validator";
export class AddCourseToCategoryDto {
    @IsNotEmpty()
    @IsString()
    courseId: string;

    @IsNotEmpty()
    @IsString()
    categoryId: number;
}