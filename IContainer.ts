export interface IContainer {
    register<T>(name: symbol, ctr: new (...args: any) => T): this;
    register<T>(name: symbol, constant: T): this;
    resolve<T>(name: symbol): T;
}
