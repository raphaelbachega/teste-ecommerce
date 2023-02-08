import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('order')
export class Order {

    @PrimaryGeneratedColumn('identity')
    id: number

    @Column({type:'uuid',generated:'uuid'})
    orderId: string

    @PrimaryGeneratedColumn('uuid')
    @Column({nullable: false})
    customer: number

    @Column({nullable: false, type:'jsonb'})
    itemList: string[]

    @Column({nullable: false, type:'decimal'})
    price: number

    @Column({type:'boolean', default: true})
    isActive: boolean

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}
