const Koa = require('koa')
const views = require('koa-views')
const app = new Koa()
const {resolve} = require('path')
const {connect,initSchemas} = require('./database/init')
const mongoose = require('mongoose')
const router = require('./routes/index')
const bodyParser = require('koa-bodyparser')
;(async()=> {
    await connect()
    initSchemas()

    //require('./tasks/api')
})()
app.use(bodyParser())
app.use(views(resolve(__dirname, './views'), {
    extension: 'ejs'
}))
app.use(router.routes()).use(router.allowedMethods())


app.listen(3000);