import {IsOptional, IsString} from 'class-validator';

export class UpdateBookDto {
    @IsString({ message: 'The title must be a text' })
    @IsOptional({ message: 'The title cannot be empty' })
    readonly title: string;
    
    @IsString({ message: 'The author must be a text' })
    @IsOptional({ message: 'The author cannot be empty' })
    readonly author: string;
    
    @IsString({ message: 'The publication_date must be a text' })
    @IsOptional({ message: 'The publication_date cannot be empty' })
    readonly publication_date: string;
    
    @IsString({ message: 'The isbn must be a text' })
    @IsOptional({ message: 'The isbn cannot be empty' })
    readonly isbn: string;
}
