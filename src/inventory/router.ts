import Router from "@koa/router";

import getNfts from "./get-nfts";

const router = new Router();

router.get("/:address", async (ctx, next) => {
  const address = ctx.params.address;
  ctx.body = {
    "nfts": await getNfts(address)
  };
  await next();
});

export default router;
