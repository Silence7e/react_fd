
import API from '../api';

export function onerror (msg, url, line, col, error) {
  if (msg !== "Script error." && !url) {
     return true;
  }

  setTimeout(function () {
      let data = {};
      col = col || (global.event && global.event.errorCharacter) || 0;

      data.url = url;
      data.line = line;
      data.col = col;
      data.ua = navigator.userAgent
      if (!!error && !!error.stack) {
          data.msg = error.stack.toString();
      } else if (!!arguments.callee) {
          let ext = [];
          let f = arguments.callee.caller, c = 3;
          while (f && (--c > 0)) {
              ext.push(f.toString());
              if (f === f.caller) {
                  break;
              }
              f = f.caller;
          }
          ext = ext.join(",");
          data.msg = ext;
      }

      API.errorReport.reportError(data, 'WEB');
  }, 0);

  return true;
};

function handleError({error, details}, redirect) {
  console.log({error, ...details});

  if (process.env.NODE_ENV === 'development') {
      return;
  }

  if (redirect) {
      window.location = redirect;
  }
}

/*
export function onerror(msg, url, lineNo, columnNo, error) {
  handleError({error, details: {msg, url, lineNo, columnNo}}, '/');
}
*/

export function onunhandledrejection(error) {
  handleError({error});
}

export default {
  onerror,
  onunhandledrejection
}
