var e={238:(e,t,r)=>{r.r(t),r.d(t,{clientEnv:()=>v,default:()=>m,env:()=>d,path:()=>a()});const n=require("lodash");var o=r.n(n),s=r(423),a=r.n(s);const i=require("envalid");var l=r.n(i),{str:c,num:u,bool:p}=l();r(142).config({silent:!0});var d=l().cleanEnv(process.env,Object.assign({},{APP_PORT:u({default:3e3}),NODE_ENV:c({default:"development"}),SERVER_RENDERED:p({default:!0}),APP_HOST:c({default:"http://localhost:"})})),v=o().pick(d,["APP_PORT","NODE_ENV"]);const m={path:a(),env:d,clientEnv:v}},929:(e,t,r)=>{var{app:n}=r(623),{env:o}=r(238),{APP_PORT:s}=o;e.exports={serve:function(){n.listen(s,(e=>{e&&console.error(e),console.info("Listening on port ".concat(s," ✅"))}))}}},210:(e,t,r)=>{r.r(t);const n=require("nocache");var o=r.n(n);(e=r.hmd(e)).exports=e=>{e.get("/v1/server-route-test",o()(),((e,t)=>t.send("Hello 🚀")))}},623:(e,t,r)=>{r.r(t);var n=r(423),o=r.n(n);const s=require("express");var a=r.n(s);const i=require("helmet");var l=r.n(i);const c=require("response-time");var u=r.n(c);const p=require("cookie-parser");var d=r.n(p);const v=require("cors");var m=r.n(v);const h=require("body-parser");var b=r.n(h);const f=require("express-handlebars");var y=r.n(f);const x=require("react");var E=r.n(x);const g=require("react-dom/server");var P=r.n(g);const j=require("react-router-dom"),w=require("serialize-javascript");var R=r.n(w);const S=require("prop-types");var q=r.n(S);class D extends E().Component{constructor(e){super(e)}render(){return console.log(this.props,"INI PROPS COMP"),E().createElement("div",{className:"home"},E().createElement("p",{className:"home__title"},"Home LIVE SSR",E().createElement("br",null),JSON.stringify(this.props.data),E().createElement("br",null)," ",this.props.testData))}}const O=D;function _(e,t,r,n,o,s,a){try{var i=e[s](a),l=i.value}catch(e){return void r(e)}i.done?t(l):Promise.resolve(l).then(n,o)}function N(e){return function(){var t=this,r=arguments;return new Promise((function(n,o){var s=e.apply(t,r);function a(e){_(s,n,o,a,i,"next",e)}function i(e){_(s,n,o,a,i,"throw",e)}a(void 0)}))}}var k,I,T=r(809);const A=[{path:"/",component:O,fetchInitialData:(I=N((function*(e,t){var r=encodeURI("https://jsonplaceholder.typicode.com/todos/1");return yield T(r).then((e=>e.json())).catch((e=>(console.warn(e),null)))})),function(e,t){return I.apply(this,arguments)})},{path:"/popular/:id",component:O,fetchInitialData:(k=N((function*(e,t){return"INI DARI SERVER"})),function(e,t){return k.apply(this,arguments)})}];class M extends x.PureComponent{constructor(e){super(e),this.state={}}render(){return E().createElement(E().Fragment,null,A.map((e=>{var{path:t,fetchInitialData:r,component:n}=e;return E().createElement(j.Route,{key:t,path:t},E().createElement(O,{data:this.props.serverData,fetchInitialData:r}))})))}}var V,C,F;V=M,C="propTypes",F={serverData:q().any},(C=function(e){var t=function(e,t){if("object"!=typeof e||null===e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var n=r.call(e,"string");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==typeof t?t:String(t)}(C))in V?Object.defineProperty(V,C,{value:F,enumerable:!0,configurable:!0,writable:!0}):V[C]=F;const H=M,$=require("is-object");var J=r.n($);function U(e){return J()(e)?Object.values(e):Array.isArray(e)?e:[e]}e=r.hmd(e);var z=r(354),L=r(714),W=r(113),B=r(46)[0],{env:K}=r(238);r(986).setup();var Y=a()(),G=a().Router();G.use(l()()),G.use(u()()),G.use(m()()),G.use(d()()),B.mode="development";var Q=z(B);Y.use(L(Q,{publicPath:B.output.publicPath,serverSideRender:!0})),Y.use(W(Q,{heartbeat:1e4})),Y.use(b().urlencoded({extended:!1})),Y.use(b().json({limit:"5mb"})),Y.engine("html",y()({helpers:{toJson:e=>JSON.stringify(e)}})),Y.set("view engine","html"),G.use(a().static(o().join("/","../","dist/build"),{redirect:!1})),G.use(a().static(o().join("/","../","assets"),{redirect:!1})),r(210)(G),console.log(K.SERVER_RENDERED,"env.SERVER_RENDERED nih cuy"),G.use("*",((e,t,r)=>{var{fetchInitialData:n=null}=A.find((t=>(0,j.matchPath)(t.path,e.url)))||{};(n?n(e,t):Promise.resolve()).then((r=>{var n=P().renderToString(E().createElement(j.StaticRouter,{location:e.url},E().createElement(H,{serverData:r}))),{devMiddleware:s}=t.locals.webpack,a=s.outputFileSystem,i=s.stats.toJson(),{assetsByChunkName:l,outputPath:c}=i;t.setHeader("Content-type","text/html"),t.send('\n      <!DOCTYPE html>\n        <html>\n          <head>\n            <title>SSR with React Router</title>\n            \x3c!-- <link href="/main.css" rel="stylesheet"> --\x3e\n            <style>\n            '.concat(U(l.main).filter((e=>e.endsWith(".css"))).map((e=>a.readFileSync(o().resolve(c,e)))).join("\n"),"\n            </style>\n            ").concat(U(l.main).filter((e=>e.endsWith(".js"))).map((e=>'<script src="'.concat(e,'" defer><\/script>'))).join("\n"),'\n          </head>\n  \n          <body>\n            <div id="app">').concat(n,'</div>\n            <script id="__PUNK_DATA__" type="application/json">').concat(R()({serverData:r}),"<\/script>\n          </body>\n        </html>\n      "))})).catch(r)})),Y.use(G),Y.shutdown=()=>{r(986).teardown()},e.exports={app:Y}},986:e=>{e.exports={setup:()=>console.log("bootstrap your app, connect to mongo etc"),teardown:()=>console.log("teardown your app, disconnect from mongo etc")}},46:(e,t,r)=>{r(423);var n=r(354),o=r(857),s=r(977),a="production",i="browserslist",l={entry:["./src/index.js","webpack-hot-middleware/client?timeout=1000&reload=true","webpack/hot/only-dev-server"],mode:a,target:i,module:{rules:[{test:/\.(js|jsx)$/,exclude:/node_modules/,use:["babel-loader"]},{test:/\.(scss|css)$/,use:[o.loader,{loader:"css-loader",options:{minimize:{safe:!0}}},{loader:"sass-loader",options:{}}]},{test:/\.(png|jpe?g|svg|gif)$/,use:[{loader:"file-loader",options:{name:"[path][name].[ext]"}}]}]},resolve:{extensions:["*",".js",".jsx"]},output:{path:"//dist/build",publicPath:"/",filename:"bundle.js",clean:!0},plugins:[new n.HotModuleReplacementPlugin,new o({filename:"[name].css",chunkFilename:"[id].css"})],devServer:{hot:!0,watchFiles:["src/**/*.js","assets/**/*"],port:3e3,host:"localhost",historyApiFallback:!0,compress:!0}},c={mode:a,target:i,entry:"./index.js",externals:[s()],output:{path:"//dist",filename:"server.js",library:{type:"module"}},experiments:{outputModule:!0},module:{rules:[{test:/\.(js)$/,use:"babel-loader"},{test:/\.css$/,use:[o.loader,"css-loader"]}]}};e.exports=[l,c]},592:e=>{e.exports=require("@babel/polyfill")},971:e=>{e.exports=require("@babel/register")},142:e=>{e.exports=require("dotenv")},857:e=>{e.exports=require("mini-css-extract-plugin")},809:e=>{e.exports=require("node-fetch")},423:e=>{e.exports=require("path")},354:e=>{e.exports=require("webpack")},714:e=>{e.exports=require("webpack-dev-middleware")},113:e=>{e.exports=require("webpack-hot-middleware")},977:e=>{e.exports=require("webpack-node-externals")}},t={};function r(n){var o=t[n];if(void 0!==o)return o.exports;var s=t[n]={id:n,loaded:!1,exports:{}};return e[n](s,s.exports,r),s.loaded=!0,s.exports}r.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return r.d(t,{a:t}),t},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.hmd=e=>((e=Object.create(e)).children||(e.children=[]),Object.defineProperty(e,"exports",{enumerable:!0,set:()=>{throw new Error("ES Modules may not assign module.exports or exports.*, Use ESM export syntax, instead: "+e.id)}}),e),r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),r.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r(592),r(971)({presets:["@babel/preset-env","@babel/preset-react"]}),r(929).serve();