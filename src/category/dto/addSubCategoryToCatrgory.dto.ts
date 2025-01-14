import { IsNotEmpty, IsString } from "class-validator";

export class AddSubCategoryToCategoryDto {
    @IsString()
    @IsNotEmpty()
    categoryId: number;

    @IsString()
    @IsNotEmpty()
    subCategoryId: number;
}