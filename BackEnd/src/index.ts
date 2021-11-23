import * as Koa from "koa";
import * as bodyparser from "koa-bodyparser";
import * as json from "koa-json";
import * as logger from "koa-logger";
import { PrivateRouter, PublicRouter } from "./api-routes";
import { connectToSqlServer } from "./sql-connection/sql";

async function initializeRoutesAndDBConnect() {
    const app = new Koa();
    app.use(json());
    app.use(logger());
    app.use(bodyparser());

    await connectToSqlServer();

    const publicRouter = new PublicRouter({});
    app.use(publicRouter.routes()).use(publicRouter.allowedMethods())

    const privateRouter = new PrivateRouter({});
    app.use(privateRouter.routes()).use(privateRouter.allowedMethods())

    app.listen(3000, () => {
        console.log("Koa started");
    });
}

initializeRoutesAndDBConnect();


