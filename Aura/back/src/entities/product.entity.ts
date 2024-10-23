import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("products")
export class Product {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    price: number

    @Column()
    category: string

    @Column()
    img: string
}