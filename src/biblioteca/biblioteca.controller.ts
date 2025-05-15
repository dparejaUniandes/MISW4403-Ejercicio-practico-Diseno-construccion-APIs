import { Controller } from '@nestjs/common';
import { BibliotecaService } from './biblioteca.service';

@Controller('bibliotecas')
export class BibliotecaController {
    constructor(private readonly museumService: BibliotecaService) {}


}
