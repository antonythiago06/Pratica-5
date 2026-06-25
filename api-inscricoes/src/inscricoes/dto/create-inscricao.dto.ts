import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateInscricaoDto {
  @Transform(({ value }: { value: unknown }): unknown =>
    typeof value === 'string' ? value.trim() : value,
  )
  @IsString()
  @IsNotEmpty()
  nome: string;

  @Transform(({ value }: { value: unknown }): unknown =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsEmail()
  email: string;

  @Transform(({ value }: { value: unknown }): number => {
    if (typeof value === 'number') return value;
    if (typeof value === 'string') return parseInt(value, 10);
    return 0;
  })
  @IsInt()
  @Min(16)
  idade: number;
  @Transform(
    ({ value }: { value: unknown }): boolean =>
      value === 'true' || value === 'on' || value === true,
  )
  @IsBoolean()
  aceitaTermos: boolean;

  @Transform(({ value }: { value: unknown }): string[] => {
    if (!value) return [];
    if (typeof value === 'string') return [value];
    if (Array.isArray(value)) return value.map(String);
    return [];
  })
  @IsString({ each: true })
  @IsOptional()
  interesses?: string[];

  @IsString()
  @IsOptional()
  observacoes?: string;
}
