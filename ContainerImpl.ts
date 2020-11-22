import { IContainer } from './IContainer';
import { Inject, REQUIRED_KEY } from './inject';

export interface ContainerValue {
    key: symbol;
    value: any;
}

export class ContainerImpl implements IContainer {

    value: ContainerValue[] = [];

    register(key: symbol, ctr: any) {
        this.value.push({ key: key, value: ctr });
        return this; //to be able to use register chain call
    }


    resolve<T>(key: symbol): T {
        let consturctorOrConstans: any;
        this.value.forEach((data) => {
            if (data.key == key) {
                consturctorOrConstans = data.value;
            }
        });

        if (typeof consturctorOrConstans == "function") {
            const metaData = Reflect.getMetadata(REQUIRED_KEY, consturctorOrConstans) || [];
            const args = this.recursiveArgValues(metaData);

            return new consturctorOrConstans(...args) as T;
        } else {
            return consturctorOrConstans;
        }

    }


    recursiveArgValues(metadata: any): any {
        let argArray = [];
        for (let metadataItem of metadata) {
            argArray[metadataItem.parameterIndex] = this.resolve(metadataItem.symbolKey);
        }
        return argArray;
    }
}