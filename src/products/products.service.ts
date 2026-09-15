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
    return await this.productRepository.find();
  }

  async findOne(id: string) {
    const product = await this.productRepository.findOneBy({
      productId: id,
    });
    if (!product) throw new NotFoundException(`Producto con ID ${id} no encontrado`);
    return product;
  }

  async findByProvider(id: string) {
    const productsFound = await this.productRepository.findBy({ provider: id } as any);
    if (productsFound.length === 0) throw new NotFoundException(`No se encontraron productos para el proveedor ${id}`);
    return productsFound;
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