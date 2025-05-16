import {IsString, Min, Max, IsInt, IsOptional} from 'class-validator';
export class ActualizarBibliotecaDto {
    @IsString({ message: 'El nombre debe ser un texto' })
    @IsOptional()
    readonly nombre: string;
    
    @IsString({ message: 'La dirección debe ser un texto' })
    @IsOptional()
    readonly direccion: string;
    
    @IsString({ message: 'La ciudad debe ser un texto' })
    @IsOptional()
    readonly ciudad: string;
    
    @IsInt({ message: 'La hora de apertura debe ser un número' })
    @Min(1)
    @Max(24)
    @IsOptional()
    readonly hora_apertura: number;

    @IsInt({ message: 'La hora de cierre debe ser un número' })
    @Min(1)
    @Max(24)
    @IsOptional()
    readonly hora_cierre: number;
}
