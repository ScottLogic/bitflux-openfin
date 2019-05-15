import React from 'react';
import * as fdc3 from 'openfin-fdc3';
import * as PropTypes from 'prop-types';
import * as fdc3 from 'openfin-fdc3';

import styles from './SearchResult.module.css';

const format = name => {
    const openBracketIndex = name.indexOf('(');
    return openBracketIndex === -1 ? name : name.slice(0, openBracketIndex - 1);
};

const handleWatchlistAddClick = (code, name) => {
    fdc3.raiseIntent('WatchlistAdd', {
        type: 'security',
        name,
        id: {
            default: code
        }
    });
};

const handleChartAddClick = async (code, name) => {
    const availableApps = await fdc3.findIntent(fdc3.Intents.VIEW_CHART);
    if (availableApps && availableApps.apps) {
        const chart = availableApps.apps.find(app => app.appId === 'chart');
        if (chart) {
            fdc3.raiseIntent(fdc3.Intents.VIEW_CHART, {
                type: 'security',
                name: code,
                id: {
                  default: name
                }
            }, chart.name);
        }
    }
}

const SearchResult = ({ code, name }) => (
    <div className={styles.searchResult}>
        <div className={styles.name}>{format(name)}</div>
        <div className={styles.subtitle}>{code}</div>
        <div className={styles.containerActions}>
            <button type="button" className={styles.buttonAction} onClick={() => handleWatchlistAddClick(code, name)}>Add to Watchlist</button>
            <button type="button" className={styles.buttonAction} onClick={() => handleChartAddClick(code, name)}>Add to Chart</button>
        </div>
    </div>
);

SearchResult.propTypes = {
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
};

export default SearchResult;
