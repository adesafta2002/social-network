"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivateRouter = exports.PublicRouter = void 0;
const Router = require("koa-router");
const auth_1 = require("../auth");
const jwt = require('koa-jwt');
class PublicRouter extends Router {
    constructor(args) {
        super(args);
        this.post('/auth/register', async (ctx) => {
            try {
                await auth_1.AuthFunctions.register(ctx.request.body);
                if (ctx.request.body.id && ctx.request.body.id !== -1) {
                    ctx.status = 201;
                    ctx.body = '';
                    ctx.set('Location', ctx.request.body.id);
                }
                else if (ctx.request.body) {
                    ctx.status = 409;
                    ctx.body = 'User already exists.';
                }
            }
            catch (error) {
                ctx.status = 400;
                ctx.body = error.message;
            }
        });
        this.post('/auth/login', async (ctx) => {
            try {
                ctx.body = await auth_1.AuthFunctions.login(ctx.request.body);
                console.log(ctx.body);
                if (ctx.body) {
                    ctx.status = 200;
                }
                else {
                    ctx.status = 401;
                    ctx.body = "User not found or passwords don't match.";
                }
            }
            catch (error) {
                ctx.status = 400;
                ctx.body = error.message;
            }
        });
    }
}
exports.PublicRouter = PublicRouter;
class PrivateRouter extends Router {
    constructor(args) {
        super(args);
        this.use(jwt({ secret: process.env.jwtSecret }));
        this.post('/security/getCurrentUser', async (ctx) => {
            ctx.body = await auth_1.SecurityFunctions.getCurrentUser(ctx);
        });
        this.get('/api/User', async (ctx) => {
            console.log('user');
            return;
        });
    }
}
exports.PrivateRouter = PrivateRouter;
