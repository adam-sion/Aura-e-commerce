import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"

@Entity("customers")
export class Customer {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    username:string

    @Column()
    password:string
}