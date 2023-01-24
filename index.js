const app = require("./src/app");

const APP_PORT = 3000;

app.listen(APP_PORT, () => {
  console.log(`App listening at ${APP_PORT}`);
});
