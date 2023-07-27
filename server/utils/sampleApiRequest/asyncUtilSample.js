'use strict';

module.exports = ({ duration }) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(duration);
    }, duration);
  });
};
