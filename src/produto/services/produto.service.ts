import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, DeleteResult } from 'typeorm';

import { Produto } from '../entities/produto.entity';
import { CategoriaService } from '../../categoria/services/categoria.service';
import { CreateProdutoDto } from '../dto/create-produto.dto';
import { UpdateProdutoDto } from '../dto/update-produto.dto';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,
    private readonly categoriaService: CategoriaService,
  ) {}

  async findAll(): Promise<Produto[]> {
    return this.produtoRepository.find({
      relations: {
        categoria: true,
      },
    });
  }

  async findById(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: { id },
      relations: {
        categoria: true,
      },
    });

    if (!produto) {
      throw new NotFoundException('Produto não encontrado');
    }

    return produto;
  }

  async findByNome(nome: string): Promise<Produto[]> {
    return this.produtoRepository.find({
      where: { nome: Like(`%${nome}%`) },
      relations: { categoria: true },
    });
  }

  async create(produtoDto: CreateProdutoDto): Promise<Produto> {
    await this.categoriaService.findById(produtoDto.categoria.id);

    return this.produtoRepository.save(produtoDto);
  }
  async update(produtoDto: UpdateProdutoDto): Promise<Produto> {
    await this.findById(produtoDto.id);
    await this.categoriaService.findById(produtoDto.categoria.id);

    return this.produtoRepository.save(produtoDto);
  }
  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return this.produtoRepository.delete(id);
  }
}
