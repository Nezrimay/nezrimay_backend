import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CommonResponseInterface } from 'src/types/commonResponse.interface';
import { AuthGuard } from 'src/user/guards/auth.guard';
import { CreateOrderDto } from './dto/createOrder.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @UseGuards(AuthGuard)
  async getAllOrders(): Promise<CommonResponseInterface> {
    return this.orderService.getAllOrders();
  }

  @Post()
  @UsePipes(new ValidationPipe())
  async createOrder(
    @Body() createOrderDto: CreateOrderDto,
  ): Promise<CommonResponseInterface> {
    return this.orderService.createOrder(createOrderDto);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  async updateOrder(
    @Body() updateOrderDto: UpdateOrderDto,
    @Param('id') orderId: number,
  ): Promise<CommonResponseInterface> {
    return this.orderService.updateOrder(updateOrderDto, orderId);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  async deleteOrder(
    @Param('id') orderId: number,
  ): Promise<CommonResponseInterface> {
    return this.orderService.deleteOrder(orderId);
  }
}
