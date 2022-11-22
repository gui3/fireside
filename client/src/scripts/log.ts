/**
 * creates a shareable instance of logger
 */

import CLIENT_CONFIG from "./CLIENT_CONFIG"

const log: any = {
    history: [],
    memory: CLIENT_CONFIG.LOG_MEMORY,
    DEBUG_MODE: CLIENT_CONFIG.DEV_MODE 
    && CLIENT_CONFIG.START_IN_DEBUG_MODE, // will be set at startup
    // console quick styles:
    style: {
        big: "font-size: 2em; font-weight: bold",
        text: "font-size: 1.2em;",
        code: "background: #000; color: #fff; font-family: monospace;"
    }
}

log.register = function (data: any, args: Array<any>) {
    log.history = [
        {data, tag: "debug", args},
        ...log.history.slice(0, log.memory - 1)
    ]
}

/** shows message only if DEBUG_MODE is true */
log.debug = function (data: any, ...args: any) {
    log.DEBUG_MODE && console.log(data, ...args)
    log.register(data, args)
}

/** shows message anyways */
log.info = function (data: any, ...args: any) {
    console.log(data, ...args)
    log.register(data, args)
}

/** shows error anyway */
log.error = function (data: any, ...args: any) {
    console.error(data, ...args)
    log.register(data, args)
}

export default log
