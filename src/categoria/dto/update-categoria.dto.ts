import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateCategoriaDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  descricao: string;
}
