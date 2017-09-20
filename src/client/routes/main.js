import onEnter from './onEnter';
export default {
  path: '/',
  onEnter,
  onChange(preState, nextState, replace, callback) {
    onEnter(nextState, replace, callback);
  },
  getComponent(nextState, callback) {
    import(/* webpackChunkName: "home" */ 'components/App').then((module)=> callback(null, module.default));
  },
  indexRoute: {
    getComponent(nextState, callback) {
      import(/* webpackChunkName: "home" */ 'containers/Home').then((module)=> callback(null, module.default));
    }
  },
  childRoutes: [
  ]
}
