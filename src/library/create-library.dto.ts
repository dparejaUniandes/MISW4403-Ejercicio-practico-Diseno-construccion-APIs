import {IsNotEmpty, IsString, Min, Max, IsInt} from 'class-validator';
export class CreateLibraryDto {
    @IsString({ message: 'The name must be a text' })
    @IsNotEmpty({ message: 'The name cannot be empty' })
    readonly name: string;
    
    @IsString({ message: 'The address must be a text' })
    @IsNotEmpty({ message: 'The address cannot be empty' })
    readonly address: string;
    
    @IsString({ message: 'The city must be a text' })
    @IsNotEmpty({ message: 'The city cannot be empty' })
    readonly city: string;
    
    @IsInt({ message: 'The opening time must be a number' })
    @Min(1)
    @Max(24)
    @IsNotEmpty({ message: 'The opening time cannot be empty' })
    readonly opening_time: number;

    @IsInt({ message: 'The closing time must be a number' })
    @Min(1)
    @Max(24)
    @IsNotEmpty({ message: 'The closing time cannot be empty' })
    readonly closing_time: number;
}
