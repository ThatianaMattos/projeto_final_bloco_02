import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCategoriaDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  nome: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  descricao: string;
}
