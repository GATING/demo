const { upload } = require("../controllers/upload");
const Router = require("koa-router");
const router = new Router({
  prefix: "/upload",
});

router.post("/", upload);
module.exports = router;
