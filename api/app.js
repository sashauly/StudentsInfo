import express from 'express';
import router from './routes/app.routes.js';

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

// test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', router);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
