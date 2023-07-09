import React from 'react'
import ReactDOM from 'react-dom/server'
import { matchPath, StaticRouter } from 'react-router-dom'
import serialize from 'serialize-javascript'
import App from '../src/app'
import routes from '../src/routes'


export const handleSSR = (req, res, next) => {

    const {fetchInitialData = null} = routes.find((route) => matchPath(route.path, req.url)) || {}
  
    const promise = fetchInitialData
      ? fetchInitialData(req, res)
      : Promise.resolve()
  
    promise.then((data) => {
      const markup = ReactDOM.renderToString(
        <StaticRouter location={req.url} >
          <App serverData={data} />
        </StaticRouter>
      )
  
      res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>SSR with React Router</title>
            <script src="/bundle.js" defer></script>
            <link href="/main.css" rel="stylesheet">
          </head>
  
          <body>
          <script id="__NEXT_DATA__" type="application/json">${serialize({serverData: data})}</script>
            <div id="app">${markup}</div>
          </body>
        </html>
      `)
    }).catch(next)
};
