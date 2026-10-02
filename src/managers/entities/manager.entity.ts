import { Location } from "../../locations/entities/location.entity.js";
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Manager {
    @PrimaryGeneratedColumn('uuid')
    managerId: string;
    @Column('text')
    managerFullName: string;
    @Column('float')
    managerSalary: number;
    @Column('text')
    managerEmail: string;
    @Column('text')
    managerPhoneNumber: string;
    
    @OneToOne(() => Location, (location) => location.manager)
    location: Location;
}
