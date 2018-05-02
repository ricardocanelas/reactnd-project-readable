/***************
 * NUMBER
 ***************/

export const uuid = () => {
    return Math.random().toString(36).substring(2) +
        (new Date()).getTime().toString(36)
}

/***************
 * OBJECT
 ***************/
export const isObject = (obj) => {
    return obj === Object(obj)
}

export const objToArray = (obj) => {
    return obj ? Object.keys(obj).map(key => {
        return obj[key]
    }) : []
}


/***************
 * STRING
 ***************/
export const truncate = (source, size) => {
    return source.length > size ? source.slice(0, size - 1) + "..." : source;
}

export const capitalize = (str = '') => {
    return typeof str !== 'string' ? '' : str[0].toUpperCase() + str.slice(1)
}

export const replaceByReg = (regex, str, params) => {
    let strAux = str
    let m
    while ((m = regex.exec(str)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) regex.lastIndex++;
        strAux = strAux.replace(m[0], params[m[1]])
    }
    return strAux
}
