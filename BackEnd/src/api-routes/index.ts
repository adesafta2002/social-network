import Router = require('koa-router');
import { AuthFunctions } from '../auth';


export class PublicRouter extends Router {
    constructor(args: any) {
        super(args);
        this.post('/auth/register', async (ctx: any) => {
            await AuthFunctions.register(ctx);
            if (ctx.id) {
                ctx.status = 201;
                console.log(ctx);
                ctx.set('UserId', ctx.id);
            } else {
                ctx.status = 409;
            }
            ctx.body = '';
        })
    }
}


export class PrivateRouter extends Router {
    constructor(args: any) {
        super(args);
        this.get('/', async ctx => {
            ctx.body = { msg: "Koa" };
        })
    }
}