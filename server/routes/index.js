/**
 * Created by ollie on 2018/7/5.
 */
const Router = require('koa-router')

const mongoose = require('mongoose')
const router = new Router()

router.get('/movies/all', async(ctx, next)=> {
    const Movie = mongoose.model('Movie')
    const query = ctx.request.query
    const movies = await Movie.find({}).sort({
        'meta.createdAt': -1
    })
    ctx.body={
        movies
    }
})

router.get('/', async(ctx, next)=> {
    await ctx.render('index')
})

router.post('/add', async(ctx, next)=> {
    let postData = ctx.request.body
    ctx.body={
        code:0,
        status:'success'
    }
})

module.exports=router