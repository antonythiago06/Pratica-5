import { Body,Controller,Get,HttpStatus,ParseFilePipeBuilder,Post,  UploadedFile, UseInterceptors,} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateInscricaoDto } from './dto/create-inscricao.dto';
import { InscricoesService } from './inscricoes.service';

const TAMANHO_MAXIMO_COMPROVANTE = 2 * 1024 * 1024;

@Controller('inscricoes')
export class InscricoesController {
  constructor(private readonly inscricoesService: InscricoesService) {}

  @Post()
  criar(@Body() body: CreateInscricaoDto) {
    return this.inscricoesService.criar(body);
  }

  @Post('com-arquivo')
  @UseInterceptors(
    FileInterceptor('comprovante', {
      limits: {
        fileSize: TAMANHO_MAXIMO_COMPROVANTE,
      },
    }),
  )
  criarComArquivo(
    @Body() body: CreateInscricaoDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /^(application\/pdf|image\/png|image\/jpeg)$/,
        })
        .addMaxSizeValidator({
          maxSize: TAMANHO_MAXIMO_COMPROVANTE,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    comprovante: Express.Multer.File,
  ) {
    return this.inscricoesService.criarComArquivo(body, comprovante);
  }

  @Get()
  listar() {
    return this.inscricoesService.listar();
  }
}
