import React from 'react'
import ReactDOM from 'react-dom/server'
import { matchPath, StaticRouter } from 'react-router-dom'
import serialize from 'serialize-javascript'
import App from '../src/app'
import routes from '../src/routes'
import isObject from "is-object";
import path from 'path'

// This function makes server rendering of asset references consistent with different webpack chunk/entry configurations
function normalizeAssets(assets) {
  if (isObject(assets)) {
    return Object.values(assets);
  }

  return Array.isArray(assets) ? assets : [assets];
}

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

      
  const { devMiddleware } = res.locals.webpack;
  const outputFileSystem = devMiddleware.outputFileSystem;
  const jsonWebpackStats = devMiddleware.stats.toJson();
  const { assetsByChunkName, outputPath } = jsonWebpackStats;


      res.setHeader('Content-type','text/html')
      res.send(`
      <!DOCTYPE html>
        <html>
          <head>
            <title>SSR with React Router</title>
            <!-- <link href="/main.css" rel="stylesheet"> -->
            <style>
            ${normalizeAssets(assetsByChunkName.main)
              .filter((item) => item.endsWith(".css"))
              .map((item) => outputFileSystem.readFileSync(path.resolve(outputPath, item)))
              .join("\n")}
            </style>
            ${normalizeAssets(assetsByChunkName.main)
              .filter((path) => path.endsWith(".js"))
              .map((path) => `<script src="${path}" defer></script>`)
              .join("\n")}
          </head>
  
          <body>
            <div id="app">${markup}</div>
            <script id="__PUNK_DATA__" type="application/json">${serialize({serverData: data})}</script>
          </body>
        </html>
      `)
    }).catch(next)
};
