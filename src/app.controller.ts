import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
    @Get('/alive')
    getHealth(): any {
        return { status: 'alive' };
    }
}
