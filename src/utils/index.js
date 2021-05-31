export const isObj = (obj) => {
    const typeCheck = typeof obj !== 'undefined' && typeof obj === 'object' && obj !== null
    return typeCheck && Object.keys(obj).length > 0
}
