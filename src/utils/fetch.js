import {isObj} from "@/utils"

const fetching = async (method, url, qs, body, retryOnce) => {
    let realURL = ''
    const realBody = isObj(body) ? body : undefined
    const headers = {
        'Content-Type': 'application/json'
    }
    if (window.fetch) {
        const params = {method, body: realBody}
        params.headers = headers
        const request = fetch(realURL, params).then(res => res.json())
        if (retryOnce) {
            return request.catch(() => setTimeout(() => request, 500))
        }
        return request
    } else if (window.XMLHttpRequest) {
        const xhr = new XMLHttpRequest()
        return new Promise((resolve, reject) => {
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
                    try{
                        const res = JSON.parse(xhr.responseText)
                        resolve(res)
                    }catch(e){
                        resolve(xhr.responseText)
                    }
                } else {
                    if(retryOnce){
                        return request
                    }
                    reject()
                }
            }
            for(const k in headers){
                xhr.setRequestHeader(k,headers[k])
            }
            xhr.open(method, url);
            if (realBody) {
                xhr.send(realBody)
            } else {
                xhr.send()
            }
        })

    } else {
        throw new Error('we are not visible on your browser,please use modern browser')
    }
}
export default fetching
