import { expect } from 'chai';
import 'mocha';
import { ContainerImpl } from '../ContainerImpl';
import { Client, Service } from '../app';

describe('Resolve tests', () => {
    it('constant should be equal to 5', () => {
        const container = new ContainerImpl();
        const constantName = Symbol.for("value");
        container.register(constantName, 5);
        let resolveConstant = container.resolve(constantName);
        expect(resolveConstant).equal(5);
    });

    it('constant should be equal to world', () => {
        const container = new ContainerImpl();
        const constantName = Symbol.for("value");
        container.register(constantName, 'world');
        let resolveConstant = container.resolve(constantName);
        expect(resolveConstant).equal("world");
    });

    it('Client.say() should return hello world', () => {
        const constantName = Symbol.for("value");
        const clientName = Symbol.for("client");
        const container = new ContainerImpl();
        container.register(constantName, "world").register(clientName, Client);
        let resolveConstructor = container.resolve<Client>(clientName);
        expect(resolveConstructor.say()).equal("hello world");
    });

    it('Service.check() should return client says: hello world', () => {
        const constantName = Symbol.for("value");
        const clientName = Symbol.for("client");
        const serviceName = Symbol.for("service");
        const container = new ContainerImpl();
        container.register(constantName, "world")
            .register(clientName, Client)
            .register(serviceName, Service);
        const service: any = container.resolve<Service>(serviceName);
        expect(service.check()).equal("client says: hello world");
    });
});