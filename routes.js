const routes = require("next-routes")(); //extra () is put because require statement returns a function

routes //this route is overriding the default nextJs navigation system
  .add("/campaigns/new", "/campaigns/new")
  .add("/campaigns/:address", "/campaigns/show")
  .add("/campaigns/:address/requests", "/campaigns/requests/index")

module.exports = routes;
