module.exports.error = (msg) => {
    const dateLog = new Date().toISOString();
    const message = `[${dateLog}] [ERROR] - ${msg}`;
    console.error(message);
}

module.exports.info = (msg) => {
    const dateLog = new Date().toISOString();
    const message = `[${dateLog}] [INFO] - ${msg}`;
    console.info(message);
}

module.exports.debug = (msg) => {
    const dateLog = new Date().toISOString();
    const message = `[${dateLog}] [DEBUG] - ${msg}`;
    console.debug(message);
}

module.exports.log = (msg) => {
    const dateLog = new Date().toISOString();
    const message = `[${dateLog}] [LOG] - ${msg}`;
    console.log(message);
}

module.exports.warn = (msg) => {
    const dateLog = new Date().toISOString();
    const message = `[${dateLog}] [WARN] - ${msg}`;
    console.warn(message);
}
