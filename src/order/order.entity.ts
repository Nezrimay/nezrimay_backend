import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('orders')
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ default: '' })
  phone: string;

  @Column({ default: '' })
  adress: string;

  @Column({ default: false })
  approved: boolean;

  @Column({ default: false })
  canceled: boolean;

  @Column({ default: '' })
  canceledReason: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  orderDate: Date;
}
