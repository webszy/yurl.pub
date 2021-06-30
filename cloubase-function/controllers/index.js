const collection = require('../utils/db')
const shortid = require('shortid')
module.exports = {
    // 查询url数据
    'GET':async function(req){
        const {id} = req.queryStringParameters
        const searchResult = await collection.where({shortId:id}).get()
        require('tcb-admin-node').logger().log('searchResult',searchResult)
        return searchResult
        // if(searchResult.data.length===0){
        //     return {
        //         code:404,
        //         msg: 'not find this id'
        //     }
        // }
        // return {
        //     code: 200,
        //     msg: 'success',
        //     target: searchResult.data[0].target
        // }
    },
    // 生成url数据
    'POST': async function(req){
        const beShortedURL = req.queryStringParameters.url
        return beShortedURL
        // const searchResult = await collection.where({target:beShortedURL}).get()
        // return searchResult
        // if(searchResult.data.length>0){
        //     return {
        //         code:304,
        //         msg:'has same row',
        //         id:searchResult.data[0].shortId
        //     }
        // } else {
        //     const shortId = shortid.generate().toLowerCase()
        //     const result = await collection.add({
        //         target:beShortedURL,
        //         shortId
        //     })
        //     return{
        //         code:200,
        //         msg:'success',
        //         data:{result,shortId}
        //     }
        // }
    },
    // 更新
    'PUT':function(event){
        return {
            code:404
        }
    },
    //删除
    'DELETE':function(event){
        return {
            code:404
        }
    }
}
