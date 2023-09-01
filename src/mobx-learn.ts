import { runInAction } from "mobx";

export const test = () => {
    console.log("test");

    const observableMap = new WeakMap();
    let executingFunction: (() => void) | undefined;

    const observable = <T extends {}>(obj: T): T => {

        const propertyListeners: { [key in keyof T]?: (() => void)[] } = {}  
        
        const result = Object.keys(obj)
            .reduce((acc, key) => 
                Object.defineProperty(acc, key, {
                    set(value: any) {
                        obj[key] = value
                        propertyListeners[key]?.forEach(func=>func())
                    },
                    get() {
                        const functionsArray = propertyListeners[key] || []

                        executingFunction &&
                            functionsArray.indexOf(executingFunction) === -1 &&
                            functionsArray.push(executingFunction)
                        
                        propertyListeners[key] ?? (propertyListeners[key] = functionsArray)
                        return obj[key]
                    }
                }),
                {} as T)
        
        observableMap.set(result, {})
        
        return result;
    }

    const autorun = (cb: () => void) => {
        const wrappedCb = () => {
            executingFunction = wrappedCb
            cb()
            executingFunction = undefined;
        }
        wrappedCb();
        return wrappedCb;
    }

    const clientCode = () => {
        const client = observable({
            age: 33,
            name: "Masha",
        })

        const client2 = observable({
            age: 21,
            name: "Nastya",
        })
        //runInAction() - для работы с асинхронностью
        autorun(() => {
            setTimeout(()=>console.log(`Timeout! Client's name is ${client.name} and her age is ${client.age}`), 1000)

        });
        autorun(() => console.log(`Client's name is ${client2.name} and her age is ${client2.age}`));
        autorun(() => console.log(`Client's ages is ${client.age} and ${client2.age}`));
        // "Clients name is Masha and her age is 33"
        client.age--
        // "Clients name is Masha and her age is 32"
        client.name = "Kira"
        // "Clients name is Kira and her age is 32"
        client.age--
        // "Clients name is Kira and her age is 31"
        client2.name = "Anna"
    }

    clientCode()
}


