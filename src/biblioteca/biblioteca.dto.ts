import {IsNotEmpty, IsString, Min, Max, IsInt} from 'class-validator';
export class BibliotecaDto {
    @IsString({ message: 'El nombre debe ser un texto' })
    @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
    readonly nombre: string;
    
    @IsString({ message: 'La dirección debe ser un texto' })
    @IsNotEmpty({ message: 'La dirección no puede estar vacía' })
    readonly direccion: string;
    
    @IsString({ message: 'La ciudad debe ser un texto' })
    @IsNotEmpty({ message: 'La ciudad no puede estar vacía' })
    readonly ciudad: string;
    
    @IsInt({ message: 'La hora de apertura debe ser un número' })
    @Min(1)
    @Max(24)
    @IsNotEmpty({ message: 'La hora de apertura no puede estar vacía' })
    readonly hora_apertura: number;

    @IsInt({ message: 'La hora de cierre debe ser un número' })
    @Min(1)
    @Max(24)
    @IsNotEmpty({ message: 'La hora de cierre no puede estar vacía' })
    readonly hora_cierre: number;
}
