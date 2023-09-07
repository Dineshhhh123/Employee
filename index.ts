import express from 'express';
import dotenv from 'dotenv';
import * as bodyParser from 'body-parser'
import { sequelize } from './src/config/db';
import routes from './src/router/route'
dotenv.config();


const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/', routes);


const port = process.env.PORT; 
(async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connection has been established successfully.'); 

    await sequelize.sync();

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
})();