"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    apps: [
        {
            name: "twitter-project",
            script: "./bin/www.js",
            instances: 5,
            watch: true,
            autorestart: true,
            env: {
                NODE_ENV: "developpement",
            },
            env_production: {
                NODE_ENV: "production",
            },
        },
    ],
};
//# sourceMappingURL=ecosystem.config.js.map