"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrivateRouter = exports.PublicRouter = void 0;
const Router = require("koa-router");
const auth_1 = require("../auth");
class PublicRouter extends Router {
    constructor(args) {
        super(args);
        this.post('/auth/register', (ctx) => __awaiter(this, void 0, void 0, function* () {
            yield auth_1.AuthFunctions.register(ctx);
            if (ctx.id) {
                ctx.status = 201;
                ctx.set('UserId', ctx.id);
            }
            else {
                ctx.status = 409;
            }
            ctx.body = '';
        }));
    }
}
exports.PublicRouter = PublicRouter;
class PrivateRouter extends Router {
    constructor(args) {
        super(args);
        this.get('/', (ctx) => __awaiter(this, void 0, void 0, function* () {
            ctx.body = { msg: "Koa" };
        }));
    }
}
exports.PrivateRouter = PrivateRouter;
