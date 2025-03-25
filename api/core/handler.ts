import type { Context, LambdaFunctionURLEvent } from 'aws-lambda';
import { unauthorized } from '../util/response';


export function handler(
    lambda: (evt: LambdaFunctionURLEvent, context: Context) => Promise<string>,
) {
    return async function (event: LambdaFunctionURLEvent, context: Context) {
        let body: string;
        let statusCode: number;

        const auth_header = event.headers?.["Authorization"]
        if (!auth_header || !auth_header.startsWith("Bearer ")) {
            return unauthorized("Missing or invalid authentication header")
        }

        const jwt = auth_header.substring("Bearer ".length).trim()
        if (jwt != "dangerzone1337") {
            return unauthorized("Invalid jwt token")
        }

        try {
            // Run the Lambda
            body = await lambda(event, context);
            statusCode = 200;
        } catch (error) {
            statusCode = 500;
            body = JSON.stringify({
                error: error instanceof Error ? error.message : String(error),
            });
        }

        return {
            body,
            statusCode,
        };
    };
}
