const config = {
    type: 'app',

    baseUrl: 'https://research.im.dhis2.org/in5320g11/', // Replace <NUMBER> with your actual group number

    entryPoints: {
        app: './src/App.js',
    },

    authorization: 'basic', // Optional: specify if your DHIS2 instance requires basic authentication
}

module.exports = config;
