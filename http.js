const app = require('./app')
const PORT = process.env.PORT || 3009

app.listen(PORT, async () => {
    try {
        // await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        console.log("RUNNING IN PORT " ,PORT)
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
  })
  