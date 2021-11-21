import Koa from "koa";
import Router from "@koa/router";
import Dotenv from "dotenv";
Dotenv.config();

import { InventoryRouter } from "./inventory";

const app = new Koa();
const router = new Router();

router.get('/', async (ctx, next) => {
  ctx.body = {
    message: "Hello world!"
  };
  await next();
});

router.use('/inventory', InventoryRouter.routes());

app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log(`${ctx.method} ${ctx.url} - ${rt}`);
})

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(3000);
