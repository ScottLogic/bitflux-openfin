import * as fdc3 from 'openfin-fdc3';

const defaultName = 'Apple Inc.';
const defaultSymbol = 'AAPL';

export default async (symbol, stockName) => {
    const availableApps = await fdc3.findIntent(fdc3.Intents.VIEW_CHART);
    if (availableApps && availableApps.apps) {
        const chart = availableApps.apps.find(app => app.appId === 'stockflux-container');
        if (chart) {
            await fdc3.raiseIntent(
                fdc3.Intents.VIEW_CHART,
                {
                    type: 'security',
                    name: symbol || defaultSymbol,
                    appName: 'stockflux-chart',
                    id: {
                        default: stockName || defaultName,
                    }
                },
                chart.name
            );
        }
    }
};