import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom';
//import './index.css';
//import SearchTable from './SearchTable';
import NestedTable from './NestedTable';
import IndexMenu from './IndexMenu'
import BlobTable from './BlobTable'
import SearchBlob from './SearchBlob'
import UploadForm from './UploadForm'

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
        <App />
      </BrowserRouter>
//  <React.StrictMode>
//        <IndexMenu />
//        <NestedTable />
//        <SearchBlob />
//        <UploadForm />
//    </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
