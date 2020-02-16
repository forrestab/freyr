import { BaseMediator, Container } from "tsmediator";

import InfluxRepository from "../common/influx-repository";

export default class MediatorWithDb extends BaseMediator {
    constructor(private repository: InfluxRepository) { 
        super();
    }

    public async Send(command: string, payload: any) {
        return this.Process(command, payload);
    }

    private Process(msg: string, payload: any) {
        let handlerClass: any = Container.Get(msg);
        let handler: any = new handlerClass(this.repository);

        if (typeof handler.Validate === "function") {
            try {
                handler.Validate(payload);
            } catch (error) {
                throw error;
            }
        }

        if (typeof handler.Log === "function") {
            handler.Log();
        }

        return handler.Handle(payload);
    }
} 
