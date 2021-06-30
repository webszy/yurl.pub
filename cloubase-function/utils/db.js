const tcb = require('tcb-admin-node')
const app = tcb.init({
    env: '',
    secretId: '',
    secretKey: ''
})
const db = app.database()
const collection = db.collection('yurl')
module.exports = collection
