import { Exclude, Expose, Transform, Type } from 'class-transformer';

export class CreateBlockDto {
    @Expose()
    hash: string;

    @Expose()
    parentHash: string;

    @Expose()
    number: number;

    @Expose()
    timestamp: number;

    @Expose()
    nonce: string;

    @Expose({ name: '_difficulty' })
    @Transform(({ obj }) => obj?._difficulty ?? null)
    difficulty: string | null;

    @Expose()
    gasLimit: string;

    @Expose()
    gasUsed: string;

    @Expose()
    miner: string;

    @Expose()
    extraData: string;

    @Expose()
    @Transform(({ value }) => value ?? null)
    baseFeePerGas: string | null;

    @Type(() => CreateTransactionDto)
    @Expose()
    transactions: CreateTransactionDto[];
}

export class CreateTransactionDto {
    @Expose()
    hash: string;

    @Expose()
    to: string;
    @Expose()
    from: string;
    @Expose()
    nonce: number;

    @Expose()
    gasLimit: string;
    @Expose()
    gasPrice: string;

    @Expose()
    data: string;
    @Expose()
    value: string;

    @Expose()
    r: string;
    @Expose()
    s: string;
    @Expose()
    v: string;

    @Expose()
    @Transform(({ value }) => value ?? null)
    type: number | null;

    @Expose()
    blockNumber: number;
    @Exclude()
    blockHash: string;

    @Expose()
    timestamp: number | null;

    @Expose()
    confirmations: number;

    @Expose()
    @Transform(({ value }) => value ?? null)
    raw: string | null;
}
