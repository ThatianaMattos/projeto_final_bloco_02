import { IsNotEmpty, IsString, IsNumber, IsInt, Min } from 'class-validator';

export class CreateProdutoDto {
  @IsNotEmpty()
  @IsString()
  nome: string;

  @IsNotEmpty()
  @IsString()
  descricao: string;

  @IsNumber()
  @Min(0)
  preco: number;

  @IsInt()
  @Min(0)
  quantidade: number;

  @IsNotEmpty()
  categoria: {
    id: number;
  };
}
