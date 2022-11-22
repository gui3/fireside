const env: any = import.meta.env

for (let key in env) {
    if (key.startsWith("VITE_")) {
        env[key.replace(/^VITE_/, "")] = env[key]
        env[key] = undefined
    }
}

/**
 * global constants
 */
const CLIENT_CONFIG: any = {
    /**
     * enables log.debug and developper toolbox
     * !! don't forget to set to false for PRODUCTION !!
     */
    DEV_MODE: true, // env.MODE !== "production",

    /**
     * uses fake data instead of api calls
     * !! only active in DEV_MODE
     */
    USE_MOCK_DATA: false,

    /**
     * will show debug messages at startup
     * ! prefer to use dev panel > "debug mode on" > "client reboot"
     */
    START_IN_DEBUG_MODE: true,

    /**
     * logs history max length
     */
    LOG_MEMORY: 100,

    /**
     * default app name
     */
    DEFAULT_APP_NAME: "Song book",

    /**
     * values in corresponding .env erase this file
     */
    ...env,
}

export default CLIENT_CONFIG