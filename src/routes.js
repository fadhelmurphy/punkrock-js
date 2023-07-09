import Home from "./pages/home/component"

const fetch = require("node-fetch");

const routes =  [
  {
    path: '/',
    component: Home,
    fetchInitialData: async (req, res) => {  
      const encodedURI = encodeURI(`https://jsonplaceholder.typicode.com/todos/1`)

    return await fetch(encodedURI)
      .then((data) => data.json())
      .catch((error) => {
        console.warn(error)
        return null
      })},
  },
  {
    path: '/popular/:id',
    component: Home,
    fetchInitialData: async (req, res) => {return "INI DARI SERVER"},
  }
]

export default routes