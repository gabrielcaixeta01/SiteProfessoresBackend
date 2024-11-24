import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course-dto';
import { UpdateCourseDto } from './dto/update-course-dto';

@Injectable()
export class CoursesService {
    constructor (
        private readonly prisma: PrismaService
    ){}

    async create(data: CreateCourseDto){
        const course = await this.prisma.courses.create({
        data: {
            ...data
        },
    });
    return course;
    }

    async findAll (){
        return this.prisma.courses.findMany();
    }

    async findCourse(id:number){
        return await this.prisma.courses.findUnique({
            where: {
                id:id,
            },
        })
    }

    async deleteCourse (id:number){
        return await this.prisma.courses.delete({
            where:{
                id:id,
            },
        })
    }

    async updateCourse (id:number, data:UpdateCourseDto){
        return await this.prisma.courses.update({
            where:{
                id:id,
            },
            data:data
        })
    }
}
