import md5 from 'blueimp-md5'
const key = import.meta.env.VITE_APP_KEY
export const getSum = (ts) => {
    return md5(ts + key + ts)
}
