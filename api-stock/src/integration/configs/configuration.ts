export default () => ({
    appUrl:process.env.APP_URL,
    port: parseInt(process.env.PORT, 3001) || 3004,
    nodeEnv: process.env.NODE_ENV,
})