const dotenv = require('dotenv');
const {connectDB} = require('./config/db');
const authRoutes = require("./routes/authRoutes");
const exp = require('express');
dotenv.config();
const app = exp();
app.use(exp.json());
const PORT = process.env.PORT || 5000;
app.use('/api/auth',authRoutes);
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};
startServer();