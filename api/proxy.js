const HttpsProxyAgent = require('https-proxy-agent');
const httpProxy = new HttpsProxyAgent('');
export { httpProxy };
