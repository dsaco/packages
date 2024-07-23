import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

import { HttpError, Http as _Request } from './utils';

type ErrorData = {
  error: string;
  message: string;
  statusCode: number;
};

const Request = new _Request(undefined, {
  resRejected: (error) => {
    error.response?.data;
    // console.log(error.response?.status);
  },
});

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
    Request.get<ResponseRecords<any>>('/api/notes/timestamp')
      .then(({ data }) => {
        console.log(data);
        // console.log(data.records);
        // console.log(data.total);
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
