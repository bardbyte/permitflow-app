import express from 'express';
import questionnaireRouter from './routes/questionnaire';
import cors from 'cors';

const app = express();
app.use(express.json());

app.use(cors({
  origin: 'http://localhost:3004', // Allow requests from this origin
  methods: ['GET', 'POST'],        // Allow these HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization']  // Allow these headers
}));

app.get('/', (req, res) => {
    res.send('Welcome to the PermitFlow API!');
  });

app.use('/api/questionnaires', questionnaireRouter);

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
