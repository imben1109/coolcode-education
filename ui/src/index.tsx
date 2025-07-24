import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import sha256 from "crypto-js/sha256";
import Base64 from "crypto-js/enc-base64";
import UTF8 from "crypto-js/enc-utf8";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

declare global {
  interface Window {
    generateAccessToken: any; // or specify the exact type instead of `any`
  }
}

window.generateAccessToken = (username: string) => {
    const SALT = "coolcodehacker";
    const hashDigest = sha256(username + SALT);
    const token = Base64.stringify(
                              UTF8.parse(
                                JSON.stringify({
                                  username: username,
                                  hash: hashDigest.toString(),
                                })
                              )
                            )
    return token;
}



