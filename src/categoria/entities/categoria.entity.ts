import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Produto } from '../../produto/entities/produto.entity';
import { IsNotEmpty } from 'class-validator';

@Entity('tb_categorias')
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column({ length: 100, nullable: false })
  nome: string;

  @IsNotEmpty()
  @Column({ length: 255, nullable: false })
  descricao: string;

  @OneToMany(() => Produto, (produto) => produto.categoria)
  produtos: Produto[];
}
