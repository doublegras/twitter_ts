export default {
  apps: [
    {
      name: "twitter-project",
      script: "./bin/www.js",
      instances: 5, //'max' pour utiliser le nombre de coeur maximum sur la machine
      watch: true, //relance le serveur en cas de modifications
      autorestart: true, //relance le serveur en cas de problème
      env: {
        NODE_ENV: "developpement",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
