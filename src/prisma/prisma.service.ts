import { INestApplication, Injectable, Logger } from '@nestjs/common';
import { PrismaClient, Prisma } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
    private readonly logger = new Logger(PrismaService.name);

    constructor() {
        super({
            log: [
                { emit: 'event', level: 'query' },
                { emit: 'event', level: 'info' },
                { emit: 'event', level: 'warn' },
                { emit: 'event', level: 'error' },
            ],
        });
        this.setUpLogger();
    }

    private setUpLogger(): void {
        this.$on<any>('info', (event: Prisma.QueryEvent) => {
            this.logger.log(JSON.stringify(event));
        });
        this.$on<any>('warn', (event: Prisma.QueryEvent) => {
            this.logger.warn(JSON.stringify(event));
        });
        this.$on<any>('error', (event: Prisma.QueryEvent) => {
            this.logger.error(JSON.stringify(event));
        });
        this.$on<any>('query', (event: Prisma.QueryEvent) => {
            const formattedLog = {
                query: event.query,
                duration: event.duration,
            };

            if (!!formattedLog?.query.match(/^INSERT\s/i)) {
                Object.assign(formattedLog, {
                    id:
                        event?.params
                            .split(/,/)?.[0]
                            .replace(/(^.*?\")|(".*?$)/g, '') ?? null,
                });
            } else if (event?.params != '[]') {
                Object.assign(formattedLog, { params: event.params });
            }

            this.logger.debug(JSON.stringify(formattedLog));
        });
    }

    async enableShutdownHooks(app: INestApplication) {
        this.$on('beforeExit', async () => {
            await app.close();
        });
    }

    buildWhereInput(params: any, isOmitUndefined = true) {
        return Object.entries(params).reduce((whereInput, [key, value]) => {
            if (!isOmitUndefined || value !== undefined) {
                if (Array.isArray(value)) {
                    value = { in: value };
                }
                Object.assign(whereInput, { [key]: value });
            }
            return whereInput;
        }, {});
    }
}
