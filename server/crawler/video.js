/**
 * Created by ollie on 2018/6/25.
 */
const puppeteer = require('puppeteer');

const base = `https://movie.douban.com/subject/` //电影详情页地址
const videoBase = `https://movie.douban.com/trailer/`  //电影预告片地址
const doubanId= `1292052`



const sleep = (time) => {

    return new Promise((resolve, reject) => {
        setTimeout(resolve, time);
    })
}

(async()=> {
    console.log('开始访问并抓取目标页面')

    //创建一个浏览器实例
    const browser = await puppeteer.launch({
        args: ['--no-sandbox'],
        dumpio: false
    });

    const page = await browser.newPage();

    await page.goto(base + doubanId, {
        waitUntil: 'networkidle2'
    })

    await sleep(1000)

    const result = await page.evaluate(()=> {
        let $ = window.$;
        let it = $('.related-pic-video')

        if(it&&it.length>0){
            let link = it.attr('href');
            let cover_style = it.attr('style').replace('background-image:url(','')
            let cover = cover_style.replace(')','')

            return {
                link,
                cover
            }
        }

        return {}
    });

    let video

    if(result.link){
        await page.goto(result.link,{
            waitUntil: 'networkidle2'
        })
        await sleep(2000)
        video = await page.evaluate(()=> {
            let $ = window.$;
            let it = $('source')

            if(it && it.length>0){
                return it.attr('src')
            }

            return ''
        });
    }

    const data = {
        video,
        doubanId,
        cover: result.cover
    }
    browser.close();

    process.send(data)
    process.exit(0)

})()