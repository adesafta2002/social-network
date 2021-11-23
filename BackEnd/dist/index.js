"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Koa = require("koa");
const bodyparser = require("koa-bodyparser");
const json = require("koa-json");
const logger = require("koa-logger");
const api_routes_1 = require("./api-routes");
const sql_1 = require("./sql-connection/sql");
async function initializeRoutesAndDBConnect() {
    const app = new Koa();
    app.use(json());
    app.use(logger());
    app.use(bodyparser());
    await (0, sql_1.connectToSqlServer)();
    const publicRouter = new api_routes_1.PublicRouter({});
    app.use(publicRouter.routes()).use(publicRouter.allowedMethods());
    const privateRouter = new api_routes_1.PrivateRouter({});
    app.use(privateRouter.routes()).use(privateRouter.allowedMethods());
    app.listen(3000, () => {
        console.log("Koa started");
    });
}
initializeRoutesAndDBConnect();
