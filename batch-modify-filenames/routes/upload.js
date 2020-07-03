// 导入控制器
const { upload } = require("../controllers/upload");
// 导入路由
const Router = require("koa-router");
// 设置路由前缀为 upload
const router = new Router({
  prefix: "/upload",
});
// post请求，请求地址为 ip + 前缀 + '/'
router.post("/", upload);
// 导出路由
module.exports = router;
