import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  // UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
// import { AuthGuard } from '@nestjs/passport';

@Controller('users')
// @UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Post()
  create(@Body() createUserDto: any) {
    return this.usersService.create(createUserDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: any) {
  //   return this.usersService.update(id, updateUserDto);
  // }
}
