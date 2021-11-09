"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const logger = require("koa-logger");
const json = require("koa-json");
const bodyparser = require("koa-bodyparser");
const api_routes_1 = require("./api-routes");
const app = new Koa();
app.use(json());
app.use(logger());
app.use(bodyparser());
const publicRouter = new api_routes_1.PublicRouter({});
app.use(publicRouter.routes()).use(publicRouter.allowedMethods());
const privateRouter = new api_routes_1.PrivateRouter({});
app.use(privateRouter.routes()).use(privateRouter.allowedMethods());
app.listen(3000, () => {
    console.log("Koa started");
});
