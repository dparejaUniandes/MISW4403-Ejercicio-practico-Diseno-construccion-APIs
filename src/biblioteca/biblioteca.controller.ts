import { Controller, UseInterceptors } from '@nestjs/common';
import { BibliotecaService } from './biblioteca.service';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';

@Controller('bibliotecas')
@UseInterceptors(BusinessErrorsInterceptor)
export class BibliotecaController {
    constructor(private readonly museumService: BibliotecaService) {}


}
