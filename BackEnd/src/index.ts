import * as Koa from "koa";
import * as Router from "koa-router";

import * as logger from "koa-logger";
import * as json from "koa-json";
import * as bodyparser from "koa-bodyparser";
import { PrivateRouter, PublicRouter } from "./api-routes";

const app = new Koa();


app.use(json());
app.use(logger());
app.use(bodyparser());

const publicRouter = new PublicRouter({});
app.use(publicRouter.routes()).use(publicRouter.allowedMethods())

const privateRouter = new PrivateRouter({});
app.use(privateRouter.routes()).use(privateRouter.allowedMethods())

app.listen(3000, () => {
    console.log("Koa started");
});
