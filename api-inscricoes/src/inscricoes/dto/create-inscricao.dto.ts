import { Transform } from 'class-transformer';
import { IsBoolean, IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateInscricaoDto {
  @Transform(({ value }) => typeof value === 'string' ? value.trim() : value)
  @IsString()
  @IsNotEmpty()
  nome: string;

  @Transform(({ value }) => typeof value === 'string' ? value.trim().toLowerCase() : value)
  @IsEmail()
  email: string;

  @Transform(({ value }) => parseInt(value, 10))
  @IsInt()
  @Min(16)
  idade: number;

  @Transform(({ value }) => value === 'true' || value === 'on' || value === true)
  @IsBoolean()
  aceitaTermos: boolean;

  @Transform(({ value }) => {
    if (!value) return [];
    if (typeof value === 'string') return [value];
    return value;
  })
  @IsString({ each: true })
  @IsOptional()
  interesses?: string[];

  @IsString()
  @IsOptional()
  observacoes?: string;
}