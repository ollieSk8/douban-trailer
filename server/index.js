const Koa = require('koa')
const views = require('koa-views')
const app = new Koa()
const {resolve} = require('path')
const {connect,initSchemas} = require('./database/init')
const mongoose = require('mongoose')
;(async()=> {
    await connect()
    initSchemas()

    //require('./tasks/movie')
})()
app.use(views(resolve(__dirname, './views'), {
    extension: 'ejs'
}))

app.use(async(ctx, next)=> {
    await ctx.render('index', {
        you: 'hello',
        me: 'world'
    })
})

app.listen(3000);