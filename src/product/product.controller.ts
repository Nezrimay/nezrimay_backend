import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CommonResponseInterface } from 'src/types/commonResponse.interface';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { CreateProductDto } from './dto/createProduct.dto';
import { ProductService } from './product.service';

@Controller('product')
@UseGuards(AuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(): Promise<CommonResponseInterface> {
    return this.productService.getAllProducts();
  }

  @Post()
  async createProduct(
    @Body()
    createProductDto: CreateProductDto,
  ): Promise<CommonResponseInterface> {
    return this.productService.createProduct(createProductDto);
  }

  @Put(':id')
  async updateProduct(
    @Body() updateProductDto: CreateProductDto,
    @Param('id') productId: number,
  ): Promise<CommonResponseInterface> {
    return this.productService.updateProduct(updateProductDto, productId);
  }

  @Delete(':id')
  async deleteProduct(
    @Param('id') productId: number,
  ): Promise<CommonResponseInterface> {
    return this.productService.deleteProduct(productId);
  }
}
