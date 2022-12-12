const http = require("http");

const mongoConnect = require("./util/database").mongoConnect;
const router = require("./routes/todoRoutes");

const server = http.createServer(router);

mongoConnect(() => {
  server.listen(3000);
});
