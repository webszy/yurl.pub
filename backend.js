const express = require('express')
const router = express.Router()
const tcb = require('@cloudbase/node-sdk')
const shortid = require('shortid')
const makeResponse = (code,msg,data)=>({code,msg,data})
/* GET home page. */
console.log(process.env.COLLECTION_NAME)
router.get('/',(req,res)=>res.status(404).send('You\'re welcome!'))
router.get('/yurl',async (req,res)=>{
    const id=req.query.id
    const app = tcb.init({
        secretId: process.env.SECERT_ID,
        secretKey: process.env.SECERT_KEY,
        env: process.env.CLOUDBASE_NAME
    });
    const collection = app.database().collection(process.env.COLLECTION_NAME)
    try{
        const searchResult = await collection.where({shortId:id}).get()
        if(searchResult.data.length===0){
            res.json(makeResponse(404,'not find this id'))
        } else {
            const target = searchResult.data[0].target
            res.json(makeResponse(200,'success',{target}))
        }
    }catch(err){
        res.json(makeResponse(505,'meet some errors on the api'))
    }

})
router.put('/shorter', async (req, res) => {
    const beShortedURL = decodeURIComponent(req.query.url)
    const app = tcb.init({
        secretId: process.env.SECERT_ID,
        secretKey: process.env.SECERT_KEY,
        env: process.env.CLOUDBASE_NAME
    });
    const collection = app.database().collection(process.env.COLLECTION_NAME)
    const id =  shortid.generate().toLowerCase()
    //检查是否重复
    try{
        const searchResult = await collection.where({target:beShortedURL}).get()
        if(searchResult.data.length >0){
            const id = searchResult.data[0].shortId
            res.json(makeResponse(304,'has same row',{id}))
        } else {
            const result = await collection.add({
                target:beShortedURL,
                shortId:id
            })
            res.json(makeResponse(200,'success',{result,shortId:id}))
        }
    } catch (e){
        res.json(makeResponse(505,'meet some errors on the api'))
    }
})

module.exports = router
