"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivateRouter = exports.PublicRouter = void 0;
const Router = require("koa-router");
const auth_1 = require("../auth");
const friends_1 = require("../models/friends");
const notification_1 = require("../models/notification");
const user_1 = require("../models/user");
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
        this.get('/api/User/relationships', async (ctx) => {
            const entry = await user_1.UserFunctions.getRelationships(ctx.query);
            ctx.body = {
                entry,
                total: entry === null || entry === void 0 ? void 0 : entry.length
            };
            ctx.staus = 200;
        });
        this.get('/api/Friend', async (ctx) => {
            const entry = await friends_1.FriendsFunctions.search(ctx.query);
            ctx.body = {
                entry,
                total: entry === null || entry === void 0 ? void 0 : entry.length
            };
            ctx.staus = 200;
        });
        this.get('/api/User', async (ctx) => {
            const entry = await user_1.UserFunctions.search(ctx.query);
            ctx.body = {
                entry,
                total: entry === null || entry === void 0 ? void 0 : entry.length
            };
            ctx.staus = 200;
        });
        this.get('/api/User/:id', async (ctx) => {
            const user = await user_1.UserFunctions.read(ctx.params.id);
            if (user) {
                ctx.staus = 200;
                ctx.body = user;
            }
            else {
                ctx.status = 404;
                ctx.body = 'User not found!';
            }
        });
        this.put('/api/User/:id', async (ctx) => {
            try {
                await user_1.UserFunctions.update(ctx.request.body);
                ctx.status = 200;
                ctx.body = '';
            }
            catch (error) {
                ctx.status = 400;
                ctx.body = error.message;
            }
        });
        this.post('/api/sendFriendRequest', async (ctx) => {
            try {
                await user_1.UserFunctions.sendFriendRequest(ctx.request.body);
                if (ctx.request.body.id && ctx.request.body.id !== -1) {
                    ctx.status = 201;
                    ctx.body = '';
                    ctx.set('Location', ctx.request.body.id);
                }
                else if (ctx.request.body) {
                    ctx.status = 409;
                    ctx.body = 'Relationship already exists.';
                }
            }
            catch (error) {
                ctx.status = 400;
                ctx.body = error.message;
            }
        });
        this.delete('/api/Relationship/:id', async (ctx) => {
            try {
                await user_1.UserFunctions.cancelFriendRequest(ctx.params.id);
                ctx.status = 200;
                ctx.body = '';
            }
            catch (error) {
                ctx.status = 400;
                ctx.body = error.message;
            }
        });
        this.put('/api/Relationship/:id', async (ctx) => {
            try {
                await user_1.UserFunctions.acceptFriendRequest(ctx.params.id);
                ctx.status = 200;
                ctx.body = '';
            }
            catch (error) {
                ctx.status = 400;
                ctx.body = error.message;
            }
        });
        this.post('/api/Notification', async (ctx) => {
            try {
                await notification_1.NotificationFunctions.insert(ctx.request.body);
                if (ctx.request.body.id && ctx.request.body.id !== -1) {
                    ctx.status = 201;
                    ctx.body = '';
                    ctx.set('Location', ctx.request.body.id);
                }
            }
            catch (error) {
                ctx.status = 400;
                ctx.body = error.message;
            }
        });
        this.get('/api/Notification', async (ctx) => {
            try {
                const entry = await notification_1.NotificationFunctions.search(ctx.query);
                ctx.body = {
                    entry,
                    total: entry === null || entry === void 0 ? void 0 : entry.length
                };
                ctx.status = 200;
            }
            catch (error) {
                ctx.status = 400;
                ctx.body = error.message;
            }
        });
        this.delete('/api/Notification/:id', async (ctx) => {
            try {
                await notification_1.NotificationFunctions.remove(ctx.params.id);
                ctx.status = 200;
                ctx.body = '';
            }
            catch (error) {
                ctx.status = 400;
                ctx.body = error.message;
            }
        });
    }
}
exports.PrivateRouter = PrivateRouter;
