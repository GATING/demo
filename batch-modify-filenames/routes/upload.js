const { upload, test } = require("../controllers/upload");
const Router = require("koa-router");
const router = new Router({
  prefix: "/upload",
});

router.post("/", upload);

router.get("/", test);
module.exports = router;
