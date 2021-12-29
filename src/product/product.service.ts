import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonResponseInterface } from 'src/types/commonResponse.interface';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/createProduct.dto';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async getAllProducts(): Promise<CommonResponseInterface> {
    const products = await this.productRepository.find();

    if (!products.length) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Ни одного товара не найдено',
      };
    }

    return {
      status: HttpStatus.OK,
      body: {
        products,
      },
    };
  }

  async createProduct(
    createProductDto: CreateProductDto,
  ): Promise<CommonResponseInterface> {
    const newProduct = new ProductEntity();
    Object.assign(newProduct, createProductDto);

    if (!newProduct.tags) {
      newProduct.tags = [];
    }

    if (!newProduct.images) {
      newProduct.images = [];
    }

    await this.productRepository.save(newProduct);

    return {
      status: HttpStatus.OK,
      message: 'Товар успешно создан',
    };
  }

  async updateProduct(
    updateProductDto: CreateProductDto,
    productId: number,
  ): Promise<CommonResponseInterface> {
    const product = await this.productRepository.findOne({ id: productId });

    if (!product) {
      throw new HttpException('Товар не найден', HttpStatus.NOT_FOUND);
    }

    Object.assign(product, updateProductDto);

    await this.productRepository.save(product);

    return {
      status: HttpStatus.OK,
      message: 'Товар успешно обновлен',
    };
  }

  async deleteProduct(productId: number): Promise<CommonResponseInterface> {
    const product = await this.productRepository.findOne({ id: productId });

    if (!product) {
      throw new HttpException('Товар не найден', HttpStatus.NOT_FOUND);
    }

    await this.productRepository.delete(product);

    return {
      status: HttpStatus.OK,
      message: 'Товар успешно удален',
    };
  }
}
