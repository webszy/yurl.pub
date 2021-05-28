const express = require('express')
const router = express.Router()
const tcb = require('@cloudbase/node-sdk')
/* GET home page. */
router.get('/', async (req, res) => {
    const app = tcb.init({
        secretId: process.env.SECERT_ID,
        secretKey: process.env.SECERT_KEY,
        env: process.env.CLOUDBASE_NAME
    });
    const collection = app.database().collection("yurl")

    res.json({
        code: 0,
        msg:''
    })
})

module.exports = router
