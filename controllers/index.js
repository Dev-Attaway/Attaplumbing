const router = require("express").Router();
const pageRoutes = require("./pageRoutes");
const searchRoutes = require("./search");
const adminRoutes = require("./admin")
const blogRoutes =  require("./blogRoutes")


router.use("/", pageRoutes, searchRoutes,blogRoutes);
router.use("/admin", adminRoutes)

module.exports = router;
