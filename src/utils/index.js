import React from 'react';
import moment from 'moment';

export const decimal = 6;

export function toTEA(unit) {
  return unit / 10 ** decimal;
}

export function toUNIT(tea) {
  const resp = tea.toFixed(decimal);
  return resp * 10 ** decimal;
}
export function diffTime(time) {
  // Set new thresholds
  // moment.relativeTimeThreshold("s", 10);
  moment.relativeTimeThreshold('ss', 60);
  moment.relativeTimeThreshold('m', 60);
  moment.relativeTimeThreshold('h', 20);
  // moment.relativeTimeThreshold("d", 25);
  // moment.relativeTimeThreshold("M", 10);

  moment.updateLocale('en', {
    relativeTime: {
      future: 'in %s',
      past: '%s ago',
      s: '%d secs',
      ss: '%d secs',
      m: 'a minute',
      mm: '%d minutes',
      h: '%d hour',
      hh: '%d hours',
      d: 'a day',
      dd: '%d days',
      M: 'a month',
      MM: '%d months',
      y: 'a year',
      yy: '%d years',
    },
  });
  return moment(time).fromNow();
}

export function convertTxType(dataOp) {
  let txType = 'transfer';
  let typeColor = 'transfer';

  if (dataOp === 0) {
    txType = 'deploy';
    typeColor = 'deploy';
  } else if (dataOp === 1) {
    txType = 'call';
    typeColor = 'call';
  }
  typeColor += ' fa fa-circle';

  return (
    <React.Fragment>
      <i className={typeColor} />
      <span>{txType}</span>
    </React.Fragment>
  );
}
export function fmtType(t, convert) {
  if (!t) return 'any';
  if (!Array.isArray(t)) {
    t = [t];
  }
  if (convert) {
    t = t.map(item => (item === 'undefined' ? 'void' : item));
  }
  return t.join('|');
}

export function formatResult(r, isError) {
  const fail = isError || r.deliver_tx.code || r.check_tx.code;
  if (fail) {
    return (
      <React.Fragment>
        <pre>
          <code>
            <b>Result</b>: <span className="error">ERROR</span>
            <br />
            <b>Message</b>: <span className="error">{r.deliver_tx.log || r.check_tx.log || tryStringifyJson(r)}</span>
            <br />
            <b>Hash</b>::&nbsp;
            {r.hash ? (
              <a target="_blank" rel="noopener noreferrer" href={`/tx/${r.hash}`}>
                {r.hash}
              </a>
            ) : (
              'N/A'
            )}
          </code>
        </pre>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <pre>
          <code>
            <b>Result</b>:
            <span className="text-success">
              &nbsp;<b>SUCCESS</b>
            </span>
            <br />
            <b>Returned Value</b>:&nbsp;
            <span className="text-success">{tryStringifyJson(r.returnValue)}</span>
            <br />
            <b>Hash</b>:&nbsp;
            <a target="_blank" rel="noopener noreferrer" href={`/tx/${r.hash}`}>
              {r.hash}
            </a>
            <br />
            <b>Height</b>: {r.height}
            <br />
            <b>Tags</b>: {tryStringifyJson(r.tags)}
            <br />
            <b>Events:</b> {tryStringifyJson(r.events)}
          </code>
        </pre>
      </React.Fragment>
    );
  }
}
export function tryStringifyJson(p, replacer = undefined, space = 2) {
  if (typeof p === 'string') {
    return p;
  }
  try {
    return '' + JSON.stringify(p, replacer, space);
  } catch (e) {
    return String(p);
  }
}
