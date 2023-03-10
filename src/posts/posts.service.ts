import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private readonly prismaService: PrismaService) {}
  // create(createPostDto: CreatePostDto)
  create(createPostDto: Prisma.PostCreateInput) {
    /**
     * creating posts with userId and without categories
     *  */
    // return this.prismaService.post.create({ data: createPostDto });

    return this.prismaService.post.create({ data: createPostDto });
  }

  findAll(query?: Prisma.PostInclude) {
    // return this.prismaService.post.findMany({ include: { author: true } });
    return this.prismaService.post.findMany({ include: query });
  }

  findOne(id: string) {
    return this.prismaService.post.findUnique({ where: { id } });
  }

  // update(id: string, updatePostDto: UpdatePostDto) {
  //   return this.prismaService.post.update({
  //     data: updatePostDto,
  //     where: { id },
  //   });
  // }
  update(id: string, updatePostDto: Prisma.PostUpdateInput) {
    return this.prismaService.post.update({
      data: updatePostDto,
      where: { id },
    });
  }

  remove(id: string) {
    return this.prismaService.post.delete({ where: { id } });
  }
}
