# Mini di framework - aka cici
# Requirements
• Typescript

• Typescript decorators

• DI concept

• Testing

# Introduction
We want to implement minimal DI (dependency injection) container, which support
1. bean registration by name supporting factory methods:
1. new instantiation
2. constant definition
2. bean injection by name in constructors

# Details
We need an application context container which support registration and resolution by name:
```TYPESCRIPT
interface IContainer {
 register<T>(name: symbol, ctr: new (...args: any) => T): this;
 register<T>(name: symbol, constant: T): this;
 resolve<T>(name: symbol): T;
}
```
The resolution mechanism should support constructor parameter injection only.
  
  Booting the application:
  
# Simplified sample
```TYPESCRIPT
// Names
const constantName = Symbol.for("value");
const clientName = Symbol.for("client");
const serviceName = Symbol.for("service");
// Bean types
class Client {
 // No parameter
 constructor(@Inject(constantName) private readonly value: string) {
 }
 public say() {
 return `hello ${this.value}`;
 }
}
class Service {
 constructor(@Inject(clientName) private readonly client: Client) {}
 public check() {
 return `client says: ${this.client.say()}`;
 }
}
// ContainerImpl is you IContainer implementation
const container: IContainer = new ContainerImpl();
container.register(constantName, "world")
 .register(clientName, Client)
 .register(serviceName, Service);
const service = container.resolve(serviceName);
console.log(service.check()); // Should write "client says: hello world"
```

# Requirements
1. Add unit tests
2. Add high-level test using sample above
3. Use lint
4. Make minimal documentation contains
1. overview of DI as concept (max 10 lines)
2. edge cases if any
