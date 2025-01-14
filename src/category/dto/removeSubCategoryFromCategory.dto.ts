import { IsNotEmpty, IsString } from "class-validator"

export class RemoveSubCategoryFromCategoryDto {
    @IsNotEmpty()
    @IsString()
    categoryId: string

    @IsNotEmpty()
    @IsString()
    subCategoryId: string
}