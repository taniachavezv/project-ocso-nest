import { IsEmail, IsNumber, IsString, MaxLength, IsObject, IsOptional } from "class-validator";
import { Manager } from "../entities/manager.entity.js";
import { Location } from "../../locations/entities/location.entity.js";

export class CreateManagerDto extends Manager {
    @IsString()
    @MaxLength(80)
    managerFullName: string;
    @IsString()
    @IsEmail()
    managerEmail: string;
    @IsNumber()
    managerSalary: number;
    @IsString()
    @MaxLength(16)
    managerPhoneNumber: string;
    @IsObject()
    @IsOptional()
    location: Location

}
