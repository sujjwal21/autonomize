import dotenv from 'dotenv';
import app from './app';
import connectDB from './config/db';

dotenv.config();

// Connect to MongoDB
connectDB();

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
