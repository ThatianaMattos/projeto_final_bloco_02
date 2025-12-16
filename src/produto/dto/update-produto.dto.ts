import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateProdutoDto {
  @IsNumber()
  id: number;

  @IsNotEmpty()
  nome: string;

  @IsNotEmpty()
  descricao: string;

  @IsNumber()
  preco: number;

  @IsNumber()
  quantidade: number;

  categoria: {
    id: number;
  };
}
