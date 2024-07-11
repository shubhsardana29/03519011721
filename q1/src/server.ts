import express from 'express';
import { Application } from 'express';
import { registerRoutes } from './routes';

const app: Application = express();

registerRoutes(app);

app.get('/', (req, res) => {
    res.send('Server is Up &  running');
    });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});