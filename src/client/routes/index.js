import mainRoute from './main';
import others from './others';

export default {
    childRoutes: [
        mainRoute,
        ...others
    ]
}
