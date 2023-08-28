import express from 'express';
import router from './routes/app.routes.js';
import cache from './routes/cache.routes.js';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  );
  next();
});

// test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});
// app.use(cache(300));
app.use('/api', router);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
