export function unauthorized(message: string) {
    return {
        body: message,
        statusCode: 401
    }
}

export function forbidden(message: string) {
    return {
        body: message,
        statusCode: 403
    }
}

export function badRequest(message: string) {
    return {
        body: message,
        statusCode: 400
    }
}
