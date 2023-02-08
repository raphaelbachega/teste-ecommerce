import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from '../entities/order.entity';
import { CreateOrderDto } from './create-order.dto';

export class UpdateOrderDto extends Order {
    
    @ApiProperty({type:'number'})
    id: number;

    @ApiProperty({type:'string'})
    orderId: string;

    @ApiProperty({type:'number'})
    customer: number;
    
    @ApiProperty({type:'array',items:{type:'string'}})
    itemList: string[];
    
    @ApiProperty({type:'number'})
    price: number;

    @ApiProperty({type:'boolean'})
    isActive: boolean;
    
    @ApiProperty({type:'date'})
    createdAt: Date;
    
    @ApiProperty({type:'date'})
    updatedAt: Date;

}
