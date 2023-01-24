import Router = require('koa-router');
import { AuthFunctions, SecurityFunctions } from '../auth';
import { FriendsFunctions } from '../models/friends';
import { NotificationFunctions } from '../models/notification';
import { PostFunctions } from '../models/post';
import { UserFunctions } from '../models/user';

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
                    ctx.body = 'User already exists.';
                }
            } catch (error) {
                ctx.status = 400;
                ctx.body = error.message;
            }
        });

        this.post('/auth/login', async (ctx: any) => {
            try {
                ctx.body = await AuthFunctions.login(ctx.request.body);
                if (ctx.body) {
                    ctx.status = 200;
                } else {
                    ctx.status = 401;
                    ctx.body = "User not found or passwords don't match.";
                }
            } catch (error) {
                ctx.status = 400;
                ctx.body = error.message;
            }
        });
    }
}


export class PrivateRouter extends Router {
    constructor(args: any) {
        super(args);

        this.use(jwt({ secret: process.env.jwtSecret }));

        this.post('/security/getCurrentUser', async (ctx: any) => {
            ctx.body = await SecurityFunctions.getCurrentUser(ctx);
        });


        this.get('/api/User/relationships', async (ctx: any) => {
            const entry = await UserFunctions.getRelationships(ctx.query);
            ctx.body = {
                entry,
                total: entry?.length
            }
            ctx.staus = 200;
        });

        this.get('/api/Friend', async (ctx: any) => {
            const entry = await FriendsFunctions.search(ctx.query);
            ctx.body = {
                entry,
                total: entry?.length
            }
            ctx.staus = 200;
        });

        this.get('/api/User', async (ctx: any) => {
            const entry = await UserFunctions.search(ctx.query);
            ctx.body = {
                entry,
                total: entry?.length
            }
            ctx.staus = 200;
        });

        this.get('/api/User/:id', async (ctx: any) => {
            const user = await UserFunctions.read(ctx.params.id);
            if (user) {
                ctx.staus = 200;
                ctx.body = user;
            } else {
                ctx.status = 404;
                ctx.body = 'User not found!';
            }
        });

        this.put('/api/User/:id', async (ctx: any) => {
            try {
                await UserFunctions.update(ctx.request.body);
                ctx.status = 200;
                ctx.body = '';
            } catch (error) {
                ctx.status = 400;
                ctx.body = error.message;
            }
        });

        this.post('/api/sendFriendRequest', async (ctx: any) => {
            try {
                await UserFunctions.sendFriendRequest(ctx.request.body);
                if (ctx.request.body.id && ctx.request.body.id !== -1) {
                    ctx.status = 201;
                    ctx.body = '';
                    ctx.set('Location', ctx.request.body.id);
                } else if (ctx.request.body) {
                    ctx.status = 409;
                    ctx.body = 'Relationship already exists.';
                }
            } catch (error) {
                ctx.status = 400;
                ctx.body = error.message;
            }
        });

        this.delete('/api/Relationship/:id', async (ctx: any) => {
            try {
                await UserFunctions.cancelFriendRequest(ctx.params.id);
                ctx.status = 200;
                ctx.body = '';
            } catch (error) {
                ctx.status = 400;
                ctx.body = error.message;
            }
        });

        this.put('/api/Relationship/:id', async (ctx: any) => {
            try {
                await UserFunctions.acceptFriendRequest(ctx.params.id);
                ctx.status = 200;
                ctx.body = '';
            } catch (error) {
                ctx.status = 400;
                ctx.body = error.message;
            }
        });

        this.post('/api/Notification', async (ctx: any) => {
            try {
                await NotificationFunctions.insert(ctx.request.body);
                if (ctx.request.body.id && ctx.request.body.id !== -1) {
                    ctx.status = 201;
                    ctx.body = '';
                    ctx.set('Location', ctx.request.body.id);
                }
            } catch (error) {
                ctx.status = 400;
                ctx.body = error.message;
            }
        });

        this.get('/api/Notification', async (ctx: any) => {
            try {
                const entry = await NotificationFunctions.search(ctx.query);

                ctx.body = {
                    entry,
                    total: entry?.length
                }
                ctx.status = 200;
            } catch (error) {
                ctx.status = 400;
                ctx.body = error.message;
            }
        });

        this.delete('/api/Notification/:id', async (ctx: any) => {
            try {
                await NotificationFunctions.remove(ctx.params.id);
                ctx.status = 200;
                ctx.body = '';
            } catch (error) {
                ctx.status = 400;
                ctx.body = error.message;
            }
        });


        this.post('/api/Post', async (ctx: any) => {
            try {
                await PostFunctions.insert(ctx.request.body);
                if (ctx.request.body.id && ctx.request.body.id !== -1) {
                    ctx.status = 201;
                    ctx.body = '';
                    ctx.set('Location', ctx.request.body.id);
                }
            } catch (error) {
                ctx.status = 400;
                ctx.body = error.message;
            }
        });

        this.get('/api/Post', async (ctx: any) => {
            try {
                const entry = await PostFunctions.search(ctx.query);

                ctx.body = {
                    entry,
                    total: entry?.length
                }
                ctx.status = 200;
            } catch (error) {
                ctx.status = 400;
                ctx.body = error.message;
            }
        });

        this.delete('/api/Post/:id', async (ctx: any) => {
            try {
                await PostFunctions.remove(ctx.params.id);
                ctx.status = 200;
                ctx.body = '';
            } catch (error) {
                ctx.status = 400;
                ctx.body = error.message;
            }
        });

        this.post('/api/Like', async (ctx: any) => {
            try {
                await PostFunctions.$like(ctx.request.body);
                if (ctx.request.body.id && ctx.request.body.id !== -1) {
                    ctx.status = 201;
                    ctx.body = '';
                    ctx.set('Location', ctx.request.body.id);
                }
            } catch (error) {
                ctx.status = 400;
                ctx.body = error.message;
            }
        });

        this.post('/api/Comment', async (ctx: any) => {
            try {
                await PostFunctions.$comment(ctx.request.body);
                if (ctx.request.body.id && ctx.request.body.id !== -1) {
                    ctx.status = 201;
                    ctx.body = '';
                    ctx.set('Location', ctx.request.body.id);
                }
            } catch (error) {
                ctx.status = 400;
                ctx.body = error.message;
            }
        });

        this.delete('/api/Like/:id', async (ctx: any) => {
            try {
                await PostFunctions.$unlike(ctx.params.id);
                ctx.status = 200;
                ctx.body = '';
            } catch (error) {
                ctx.status = 400;
                ctx.body = error.message;
            }
        });

        this.delete('/api/Comment/:id', async (ctx: any) => {
            try {
                await PostFunctions.$removeComment(ctx.params.id);
                ctx.status = 200;
                ctx.body = '';
            } catch (error) {
                ctx.status = 400;
                ctx.body = error.message;
            }
        });
    }
}