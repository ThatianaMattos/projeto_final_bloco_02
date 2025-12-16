import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like, DeleteResult } from 'typeorm';
import { Categoria } from '../entities/categoria.entity';
import { CreateCategoriaDto } from '../dto/create-categoria.dto';
import { UpdateCategoriaDto } from '../dto/update-categoria.dto';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async findAll(): Promise<Categoria[]> {
    return this.categoriaRepository.find({
      select: ['id', 'nome'],
      relations: {
        produtos: true,
      },
    });
  }

  async findById(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({
      where: { id },
      relations: {
        produtos: true,
      },
    });

    if (!categoria) {
      throw new NotFoundException('Categoria não encontrada');
    }

    return categoria;
  }

  async findByNome(nome: string): Promise<Categoria[]> {
    return this.categoriaRepository.find({
      where: {
        nome: Like(`%${nome}%`),
      },
      relations: {
        produtos: true,
      },
    });
  }

  async create(categoriaDto: CreateCategoriaDto): Promise<Categoria> {
    return this.categoriaRepository.save(categoriaDto);
  }

  async update(categoriaDto: UpdateCategoriaDto): Promise<Categoria> {
    await this.findById(categoriaDto.id);
    return this.categoriaRepository.save(categoriaDto);
  }

  async delete(id: number): Promise<DeleteResult> {
    await this.findById(id);
    return this.categoriaRepository.delete(id);
  }
}
