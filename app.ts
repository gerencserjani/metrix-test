import { IContainer } from './IContainer';
import { ContainerImpl } from "./ContainerImpl";
import { Inject } from "./inject";

// Names
const constantName = Symbol.for("value");
const clientName = Symbol.for("client");
const serviceName = Symbol.for("service");
// Bean types
export class Client { //Export needed for testing
    // No parameter
    constructor(@Inject(constantName) private readonly value: string) {
    }
    public say() {
        return `hello ${this.value}`;
    }
}
export class Service { //Export needed for testing
    constructor(@Inject(clientName) private readonly client: Client) { }
    public check() {
        return `client says: ${this.client.say()}`;
    }
}
// ContainerImpl is you IContainer implementation
const container: IContainer = new ContainerImpl();
container.register(constantName, "world")
    .register(clientName, Client)
    .register(serviceName, Service);
const service = container.resolve<Service>(serviceName);
console.log(service.check()); // Should write "client says: hello world"