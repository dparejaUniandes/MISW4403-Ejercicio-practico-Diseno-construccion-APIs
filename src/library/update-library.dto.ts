import {IsString, Min, Max, IsInt, IsOptional} from 'class-validator';
export class UpdateLibraryDto {
    @IsString({ message: 'The name must be a text' })
    @IsOptional()
    readonly name: string;
    
    @IsString({ message: 'The address must be a text' })
    @IsOptional()
    readonly address: string;
    
    @IsString({ message: 'The city must be a text' })
    @IsOptional()
    readonly city: string;
    
    @IsInt({ message: 'The opening time must be a number' })
    @Min(1)
    @Max(24)
    @IsOptional()
    readonly opening_time: number;

    @IsInt({ message: 'The closing time must be a number' })
    @Min(1)
    @Max(24)
    @IsOptional()
    readonly closing_time: number;
}
