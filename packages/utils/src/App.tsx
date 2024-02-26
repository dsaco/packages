import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { debounce as deb } from 'lodash';

import { Request as _Request } from './utils';

import { debounce } from './utils';

const debounced = debounce(
  function (this: any, value: number) {
    console.log(this.name, value);
    return value;
  },
  32,
  { leading: true },
);

debounced.call({ name: '章三' }, 333);

const a = debounced('1', {});
console.log(a);

const deb2 = deb((value) => {
  return value;
}, 32);

const b = deb2('2');
console.log(b);

const debounced2 = deb((value) => {
  return value;
}, 32);

const res = [debounced2('a'), debounced2('b'), debounced2('c')];
console.log(res);
setTimeout(() => {
  const results = [debounced2('d'), debounced2('e'), debounced2('f')];
  console.log(results);
}, 1000);

type ErrorData = {
  error: string;
  message: string;
  statusCode: number;
};

const Request = new _Request();

Request.useResponse(undefined, (e) => Promise.reject(e.response.statusText));

interface ResponseRecords<T> {
  code: number;
  message: string;
  data: {
    records: T[];
    total: number;
  };
}

function App() {
  useEffect(() => {
    Request.get<ResponseRecords<any>>('/api/test/200')
      .then(({ data }) => {
        console.log(data.records);
        console.log(data.total);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
