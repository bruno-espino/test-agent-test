export function jsonResponse(data: any, status: number = 200): Response {
    return new Response(JSON.stringify(data), {
        status,
        headers: { "Content-Type": "application/json" },
    });
}

export function unauthorized(message: string): Response {
    return jsonResponse({ error: message }, 401);
}

export function forbidden(message: string): Response {
    return jsonResponse({ error: message }, 403);
}

export function badRequest(message: string): Response {
    return jsonResponse({ error: message }, 400);
}
