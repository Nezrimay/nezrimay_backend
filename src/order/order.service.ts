import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonResponseInterface } from 'src/types/commonResponse.interface';
import { Repository } from 'typeorm';
import { CreateOrderDto } from './dto/createOrder.dto';
import { UpdateOrderDto } from './dto/updateOrder.dto';
import { OrderEntity } from './order.entity';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepository: Repository<OrderEntity>,
  ) {}

  async getAllOrders(): Promise<CommonResponseInterface> {
    const orders = this.orderRepository.find();

    if (!orders) {
      return {
        status: HttpStatus.NOT_FOUND,
        message: 'Заказы не найдены',
      };
    }

    return {
      status: HttpStatus.OK,
      message: 'Заказы успешно загружены',
      body: {
        orders,
      },
    };
  }

  async createOrder(
    createOrderDto: CreateOrderDto,
  ): Promise<CommonResponseInterface> {
    const newOrder = new OrderEntity();
    Object.assign(newOrder, createOrderDto);

    await this.orderRepository.save(newOrder);

    return {
      status: HttpStatus.OK,
      message: 'Заказ успешно создан',
    };
  }

  async updateOrder(
    updateOrderDto: UpdateOrderDto,
    orderId: number,
  ): Promise<CommonResponseInterface> {
    const order = await this.orderRepository.findOne({ id: orderId });

    if (!order) {
      throw new HttpException('Товар не найден', HttpStatus.NOT_FOUND);
    }

    Object.assign(order, updateOrderDto);

    await this.orderRepository.save(order);

    return {
      status: HttpStatus.OK,
      message: `Заказ успешно ${
        updateOrderDto.approved ? 'подтвержден' : 'отклонён'
      }`,
    };
  }

  async deleteOrder(orderId: number): Promise<CommonResponseInterface> {
    const order = await this.orderRepository.findOne({ id: orderId });

    if (!order) {
      throw new HttpException('Товар не найден', HttpStatus.NOT_FOUND);
    }

    await this.orderRepository.delete(order);

    return {
      status: HttpStatus.OK,
      message: 'Заказ успешно удален',
    };
  }
}
