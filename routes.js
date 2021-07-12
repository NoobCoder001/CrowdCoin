const routes = require("next-routes")(); //extra () is put because require statement returns a function

routes //this route is overriding the default nextJs navigation system
  .add("/campaigns/new", "/campaigns/new")
  .add("/campaigns/:address", "/campaigns/show");

module.exports = routes;
