import { BaseMediator, Container } from "tsmediator";
import { InfluxDB } from "influx";

export default class MediatorWithDb extends BaseMediator {
    constructor(private db: InfluxDB) { 
        super();
    }

    public async Send(command: string, payload: any) {
        return this.Process(command, payload);
    }

    private Process(msg: string, payload: any) {
        let handlerClass: any = Container.Get(msg);
        let handler: any = new handlerClass(this.db);

        /*try {
            handler.Validate(payload);
        } catch (error) {
            throw error;
        }*/

        handler.Log();

        return handler.Handle(payload);
    }
} 
