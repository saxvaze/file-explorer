const path = require('path');

module.exports = {
    paths: function (paths, env) {
        paths.appIndexJs = path.resolve(__dirname, 'client/index.tsx');
        paths.appSrc = path.resolve(__dirname, 'client');
        paths.appPublic = path.resolve(__dirname, 'client/public');
        paths.appHtml = path.resolve(__dirname, 'client/public/index.html');
        return paths;
    },
}