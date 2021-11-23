import Router = require('koa-router');
import { AuthFunctions, SecurityFunctions } from '../auth';

const jwt = require('koa-jwt');

export class PublicRouter extends Router {
    constructor(args: any) {
        super(args);
        this.post('/auth/register', async (ctx: any) => {
            try {
                await AuthFunctions.register(ctx.request.body);
                if (ctx.request.body.id && ctx.request.body.id !== -1) {
                    ctx.status = 201;
                    ctx.body = '';
                    ctx.set('Location', ctx.request.body.id);
                } else if (ctx.request.body) {
                    ctx.status = 409;
                    ctx.body = '';
                }
            } catch (error) {
                ctx.status = 400;
                ctx.body = error.message;
            }
        });

        this.post('/auth/login', async (ctx: any) => {
            try {
                ctx.body = await AuthFunctions.login(ctx.request.body);
                console.log(ctx.body);
                if (ctx.body) {
                    ctx.status = 200;
                } else {
                    ctx.status = 401;
                    ctx.body = "User not found or passwords don't match";
                }
            } catch (error) {
                ctx.status = 400;
                ctx.body = error.message;
            }
        })
    }
}


export class PrivateRouter extends Router {
    constructor(args: any) {
        super(args);

        this.use(jwt({ secret: process.env.jwtSecret }));

        this.post('/security/getCurrentUser', async (ctx: any) => {
            ctx.body = await SecurityFunctions.getCurrentUser(ctx);
        })

        this.get('/api/User', async (ctx: any) => {
            console.log('user');
            return;
        })
    }
}