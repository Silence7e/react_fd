export asyncBusboy from './async-busboy';
import _ from 'lodash';

const charset = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_.';

export function randomString(length) {
  return _.join(_.sampleSize(charset, _.max([length, 1])), '');
}
