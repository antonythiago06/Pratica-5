import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InscricoesModule } from './inscricoes/inscricoes.module';

@Module({
  imports: [InscricoesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}