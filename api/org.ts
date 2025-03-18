import { Resource } from "sst";
import { Context, LambdaFunctionURLEvent } from "aws-lambda";
import { Pool } from "pg";
import { handler } from "./core/handler";

const pool = new Pool({
    user: Resource.db.username,
    password: Resource.db.password,
    database: Resource.db.database,
    host: Resource.db.host,
    port: Resource.db.port,
});


export const main = handler(async (event: LambdaFunctionURLEvent, context: Context) => {
    if (!event.body) {
        throw new Error('Missing request body')
    }
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release()
    return JSON.stringify(`event info: ${event}, context info: ${context}, postgres info: ${client}, result: ${result}`)
}
)