/**
 * Created by ollie on 2018/6/22.
 */

const child_process = require('child_process');

const path = require('path');

(async()=> {
    const script = path.resolve(__dirname, '../crawler/trailer-list')
    const child = child_process.fork(script, [])

    let invoked = false;

    child.on('error', (err)=> {
        if (invoked) return

        invoked = true

        console.lo(err)
    })

    child.on('exit', (code)=> {
        if (invoked) return

        invoked = false

        let err = code === 0 ? null : new Error('exit code' + code)

        console.log(err)
    })

    child.on('message', (data)=> {

        let result = data.result

        console.log(result)
    })

})()