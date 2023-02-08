export default () => ({
    appUrl:process.env.APP_URL,
    port: parseInt(process.env.PORT, 3000) || 3003,
    nodeEnv: process.env.NODE_ENV,
})