/**
 * Created by ollie on 2018/6/25.
 */
const child_process = require('child_process');

const path = require('path');

(async()=> {
    const script = path.resolve(__dirname, '../crawler/video')
    const child = child_process.fork(script, [])

    let invoked = false;

    child.on('error', (err)=> {
        if (invoked) return

        invoked = true

        console.log(err)
    })

    child.on('exit', (code)=> {
        if (invoked) return

        invoked = true

        let err = code === 0 ? null : new Error('exit code' + code)

        console.log(err)
    })

    child.on('message', (data)=> {

        //let result = data.result

        console.log(data)
    })

})()