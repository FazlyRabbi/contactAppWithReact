import express, { json } from 'express';
// import React from 'react';
// import { StaticRouter } from 'react-router-dom';
// import { renderToString } from 'react-dom/server';
// import fs from 'fs';
import jsonServer from 'json-server';
import path from 'path';
// import App from '../src/components/routes/App.router';
const app = express();
// app.use(express.static(path.resolve(__dirname, '..', 'dist')));
// app.use(
//   '/api',
//   jsonServer.defaults(),
//   jsonServer.router(path.resolve(__dirname, 'db.json')),
// );
// const html = fs
//   .readFileSync(path.resolve(__dirname, '..', 'dist', 'index.html'))
//   .toString();
// const parts = html.split('Here all App code goes');

// app.use((req, res) => {
//   const reactMarkUp = (
//     <StaticRouter location={req.url}>
//       <App />
//     </StaticRouter>
//   );
//   res.send(`${parts[0]} ${renderToString(reactMarkUp)} ${parts[1]}`);
//   res.end();
// });

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'));
// });
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`server open on port ${port}`);
});
app.get("/world",(req,res)=>{
  res.send("hello world");
})
app.use(
  '/api',
  jsonServer.defaults(),
  jsonServer.router(path.resolve(__dirname, 'db.json')),
);
app.use(express.static(path.resolve(__dirname,'..','dist')))
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'dist', 'index.html'));
});


