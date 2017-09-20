import main, { login, callApi, runService, init, routeChange } from 'client/sagas';
import loaders from 'client/services/loaders';
import urls from 'client/routes/urls';

const sagas = [
    runService,
    callApi,
    login,
    routeChange(loaders, urls)
];

export default main(sagas, init);
