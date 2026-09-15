import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto.js';
import { UpdateEmployeeDto } from './dto/update-employee.dto.js';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './entities/employee.entity.js';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>
  ){}

  async create(createEmployeeDto: CreateEmployeeDto){
    const employee = await this.employeeRepository.save(createEmployeeDto);
    return employee;
  }

  async findAll() {
    return await this.employeeRepository.find();
  }

  async findOne(id: string) {
    const employee = await this.employeeRepository.findOneBy({
      employeeId: id
    });
    if (!employee) throw new NotFoundException(`Empleado con ID ${id} no encontrado`);
    return employee;
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const employeeToUpdate = await this.employeeRepository.preload({
      employeeId: id,
      ...updateEmployeeDto
    });
    if (!employeeToUpdate) throw new NotFoundException(`Empleado con ID ${id} no encontrado`);
    
    await this.employeeRepository.save(employeeToUpdate);
    return employeeToUpdate;
  }

  async remove(id: string) {
    await this.findOne(id); // Asegura que exista antes de borrar
    await this.employeeRepository.delete({
      employeeId: id
    });
    return {
      message: "Employee deleted"
    };
  }
}