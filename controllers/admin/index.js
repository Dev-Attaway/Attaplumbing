const router = require('express').Router();
const adminRoutes = require('./adminRoutes');
const adminSlideShowRoutes = require('./slideshowRoutes')
const adminBlogTool = require('./adminBlogRoutes')
const adminMetaData = require('./metaDataRoutes')

router.use('/', adminRoutes,adminSlideShowRoutes,adminBlogTool,adminMetaData);


module.exports = router;