/* @flow */

class Response {
    body: object | object[];
    headers: object;
    statusCode: number;

    constructor({ body, headers, statusCode } = {}) {
        this.body = body || undefined;
        this.headers = headers || {};
        this.statusCode = statusCode || 200;
    }

    static withStatusCode(statusCode: number) {
        return new Response({ statusCode });
    }

    static ok() {
        return Response.withStatusCode(200);
    }

    static badRequest() {
        return Response.withStatusCode(400);
    }

    static notFound() {
        return Response.withStatusCode(404);
    }

    static internalServerError() {
        return Response.withStatusCode(500);
    }

    withStatusCode(statusCode: number) {
        this.statusCode = statusCode;
        return this;
    }

    withJson(body: object | object[]) {
        this.body = JSON.stringify(body);
        this.headers['Content-Type'] = 'application/json';
        return this;
    }
}

export default Response;
