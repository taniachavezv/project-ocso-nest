import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto.js';
import { UpdateProductDto } from './dto/update-product.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity.js';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>
  ){}

  async create(createProductDto: CreateProductDto) {
    const product = await this.productRepository.save(createProductDto);
    return product;
  }

  async findAll() {
    return this.productRepository.find({
      loadEagerRelations: true,
      relations: {
        provider: true,
      } 
    });
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOneBy({
      productId: id,
    });
    if (!product) throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    return product;
  }

  async findByProvider(id: string) {
    return this.productRepository.findBy({
      provider: {
        providerId: id,
      }
    })
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    const productToUpdate = await this.productRepository.preload({
      productId: id,
      ...updateProductDto
    });
    if (!productToUpdate) throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    
    await this.productRepository.save(productToUpdate);
    return productToUpdate;
  }

  async remove(id: string) {
    await this.findOne(id); // Verifica que exista
    await this.productRepository.delete({
      productId: id,
    });
    return {
      message: `Objeto con id ${id} eliminado` // <- Corregidas las comillas por acentos graves (backticks)
    };
  }
}