import { plainToInstance } from 'class-transformer';
import { BigNumber } from 'ethers';

function transformEthObject(ethObj: any) {
    return Object.entries(ethObj).reduce((acc, [k, v]) => {
        switch (true) {
            case v instanceof BigNumber: {
                v = (v as BigNumber).toHexString();
                break;
            }
            case Array.isArray(v): {
                v = (v as Array<any>).map((sub) => transformEthObject(sub));
                break;
            }
        }

        return Object.assign(acc, { [k]: v });
    }, {});
}

export function transformToDto(
    dtoClassConstructor: any,
    object: any,
): typeof dtoClassConstructor {
    const ethObj = transformEthObject(object);

    return plainToInstance(dtoClassConstructor, ethObj, {
        excludeExtraneousValues: true,
    });
}
