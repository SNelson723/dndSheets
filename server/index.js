// server index to set up the listening port
const app = require('./app');
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});