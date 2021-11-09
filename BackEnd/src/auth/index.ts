const jwt = require('jsonwebtoken');

export namespace AuthFunctions {
    export async function register(ctx: any) {
        console.log(ctx.request.body);
    }
}
