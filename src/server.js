import app from './app';
import './bootstrap';

const port = process.env.APP_PORT;

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
