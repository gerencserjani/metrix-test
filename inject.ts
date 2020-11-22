import "reflect-metadata";

export const REQUIRED_KEY = Symbol("requiredParameter");

export function Inject(symbolKey: any) { // @Inject(symbol)
    return (target: Object, //class that contains the inject value
        propertyKey: string | symbol, // 
        parameterIndex: number) => { //the index of @Inject parameter


        // Pull existing parameters for this method or create an empty array
        const requiredParameters = Reflect.getMetadata(REQUIRED_KEY, target) || [];
        requiredParameters.push({ symbolKey, parameterIndex });

        // Update the required parameters for this method
        Reflect.defineMetadata(REQUIRED_KEY, requiredParameters, target);


    }
}

