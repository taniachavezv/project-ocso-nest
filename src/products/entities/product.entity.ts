import { Provider } from "src/products/entities/product.entity.ts";
import { Column, ManyToOne, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn("uuid")
    productId: string;
    @Column('text')
    productName: string;
    @Column('float')
    price: number;
    @Column('int')
    countSeal: number;
    // @Column({type: "uuid"})
    // provider: string;
    @ManyToOne(() => Provider, (provider) => provider.products, {
        eager: true
    })
    provider: Provider
}
