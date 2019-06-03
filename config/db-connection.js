const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, { useNewUrlParser: true })
  .then(x => {
    console.log(
      `Successful connection to the Database. Currently at "${
        x.connections[0].name
      }"`
    );
  })
  .catch(err => {
    console.error("Error connecting to the Database", err);
  });
