import { Resource } from "sst";
import { Pool } from "pg";
import { handler } from "./core/handler";

const pool = new Pool({
    user: Resource.DB.username,
    password: Resource.DB.password,
    database: Resource.DB.database,
    host: Resource.DB.host,
    port: Resource.DB.port,
});


export const main = handler(async (event, context) => {
    if (!event.body) {
        throw new Error('Missing request body')
    }
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release()
    //return JSON.stringify(`event info: ${event}, context info: ${context}, postgres info: ${client}, result: ${result}`)
    return 'hi'
}
)