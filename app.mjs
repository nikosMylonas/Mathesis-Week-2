import express from "express";
import { engine } from 'express-handlebars';
import { router } from './modules/router.mjs';

// const date = new Date();
// const currentYear = date.getFullYear();
// console.log(currentYear);

const app = express();
app.engine('hbs', engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');

app.use(express.static('public'));

app.use(router);

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`App is running and listening on port ${PORT}`));
