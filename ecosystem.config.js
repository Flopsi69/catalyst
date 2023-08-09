module.exports = {
  apps: [
    {
      name: 'alfa-catalyst',
      port: '3000',
      exec_mode: 'cluster',
      instances: 'max',
      script: './src/.output/server/index.mjs',
    },
  ],
};
