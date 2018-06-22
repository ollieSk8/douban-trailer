/**
 * Created by ollie on 2018/6/22.
 */
const puppeteer = require('puppeteer');

const url = 'https://movie.douban.com/tag/#/?sort=T&range=0,10&tags=%E7%BB%8F%E5%85%B8';

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

    await page.goto(url, {
        waitUntil: 'networkidle2'
    })

    await sleep(3000)

    await page.waitForSelector('.more')

    for (let i = 0; i < 2; i++) {
        await sleep(3000);
        await page.click('.more')
    }

    const result = await page.evaluate(()=> {
        let $ = window.$;
        let items = $('.list-wp a');
        let links = [];

        if (items.length >= 1) {
            items.each((index, item)=> {
                let it = $(item);
                let doubanId = it.find('div').data('id');
                let title = it.find('.title').text();
                let rate = Number(it.find('.rate').text());
                let poster = it.find('img').attr('src').replace('s_ratio_poster', 'l_ratio_poster');

                links.push({
                    doubanId,
                    title,
                    rate,
                    poster
                })
            });
        }

        return links;
    });

    browser.close();

    process.send({result})
    process.exit(0)

})()