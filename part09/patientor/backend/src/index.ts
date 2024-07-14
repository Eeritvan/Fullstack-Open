import express from 'express';
import router from "./routes/routes";
const app = express();
app.use(express.json());

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const cors = require('cors');
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
app.use(cors());

app.use('/api/', router);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});