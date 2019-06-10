import * as fdc3 from 'openfin-fdc3';

const defaultSymbol = 'AAPL';

export default async (symbol) => {
    const availableApps = await fdc3.findIntent('ViewNews');
    if (availableApps && availableApps.apps) {
        const newsApp = availableApps.apps.find(app => app.appId === 'stockflux-container');
        if (newsApp) {
            await fdc3.raiseIntent(
                'ViewNews',
                {
                    type: 'news',
                    name: symbol || defaultSymbol,
                    appName: 'stockflux-news'
                },
                newsApp.name
            );
        }
    }
};