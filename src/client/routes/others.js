export default [
    {
        path: '*',
        getComponent(nextState, callback) {
            require.ensure([], (require) => callback(null, require('containers/Home').default), 'home');
        }
    }

]
