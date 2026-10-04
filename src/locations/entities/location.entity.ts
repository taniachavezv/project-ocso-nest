import { Manager } from "../../managers/entities/manager.entity.js";
import { Region } from "../../region/entities/region.entity.js";
import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { Employee } from "../../employees/entities/employee.entity.js";
import { ApiProperty } from "@nestjs/swagger";

@Entity()
export class Location {
    @PrimaryGeneratedColumn('increment')
    locationId: number;

    @ApiProperty({
        default: "OCSO Juriquilla"
    })
    @Column('text')
    locationName: string;

    @ApiProperty({
        default: "Avenida Tal, S/N, 76177"
    })
    @Column('text')
    locationAddress: string;

    @ApiProperty({
        default: [12,12]
    })
    @Column('simple-array')
    locationLatLng: number[];

    @OneToOne(() => Manager, {
        eager: true
    })
    @JoinColumn({
        name: "managerId"
    })
    manager: Manager;

    @ManyToOne(() => Region, (region) => region.location)
    @JoinColumn({
        name: "regionId"
    })
    region: Region;

    @OneToMany(() => Employee, (employee) => employee.location)
    employees: Employee[];
}
