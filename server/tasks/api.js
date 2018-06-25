/**
 * Created by ollie on 2018/6/25.
 */

const rp = require('request-promise-native')

async function fetchMovie(item) {

    const url = `http://api.douban.com/v2/movie/subject/${item.doubanId}`

    const res = await rp(url)

    return res
}

(async()=> {
    let movies = [
        {
            doubanId: 1292052,
            title: '肖申克的救赎',
            rate: 9.6,
            poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p480747492.jpg'
        },
        {
            doubanId: 1295644,
            title: '这个杀手不太冷',
            rate: 9.4,
            poster: 'https://img3.doubanio.com/view/photo/l_ratio_poster/public/p511118051.jpg'
        },
        {
            doubanId: 1292720,
            title: '阿甘正传',
            rate: 9.4,
            poster: 'https://img1.doubanio.com/view/photo/l_ratio_poster/public/p510876377.jpg'
        }
    ]

    movies.map(async(movie)=> {

        let movieData = await fetchMovie(movie);

        try {
            movieData = JSON.parse(movieData)

            console.log(movieData.tags)
            console.log(movieData.summary)
        } catch (e) {
            console.log(e)
        }
    })

})()