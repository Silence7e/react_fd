import moment from 'moment';
import storage from '../storage';

export default async (url, options) => {
    const response = await fetch(url, options);

    const ts = parseInt(response.headers.get('X-TIMESTAMP'));
    if (ts > 0) {
        await Promise.all([storage.save('global', 'sts', ts),
            storage.save('global', 'cts', moment().unix())]);
    }
    let json;
    try {
        json = await response.json();
    } catch(e) {
        json = null;
    }
    if (!response.ok) {
        return Promise.reject({
            ok: response.ok,
            error: json,
            timestamp: ts,
            status: response.status,
            statusText: response.statusText
        });
    }

    return {
        ok: response.ok,
        response: json,
        timestamp: ts,
        status: response.status,
        statusText: response.statusText
    };
}
