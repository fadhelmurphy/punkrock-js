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


  res.set("Content-Type", "text/html");
      res.write(`
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
          </head>
  
          <body>
            <div id="root">${markup}</div>
            <script id="__PUNK_DATA__" type="application/json">${serialize({serverData: data})}</script>
            ${normalizeAssets(assetsByChunkName.main)
              .filter((path) => path.endsWith(".js"))
              .map((path) => `<script src="${path}"></script>`)
              .join("\n")}
          </body>
        </html>
      `);
    }).catch(next)
};
