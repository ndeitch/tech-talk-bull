import { Controller, Get } from '@nestjs/common'

@Controller('hello')
export class HelloController {
  @Get()
  hi(): string {
    return 'Hi'
  }
}
