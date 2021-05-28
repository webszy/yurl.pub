
const fetching = async (method,url,qs,body,retryOnce) =>{
    let realURL = ''
    let realBody = null
    if(window.fetch){
        const params = {method}
        if(realBody){
            params.body = realBody
        }
        return fetch(realURL,params)
            .then(res=>res.json())
    } else {

    }
}
export default fetching
