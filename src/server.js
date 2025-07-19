// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public')); // Optional: for serving static frontend if needed

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ROUTES
const authRoutes = require('./routes/auth.js');
const googleAuthRoutes = require('./routes/googleAuth.js');
const chatRoutes = require('./routes/chat.js');
const feedbackRoutes = require('./routes/feedback.js');
const saveRoutes = require('./routes/save.js');

// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/google', googleAuthRoutes); // If used
app.use('/api/chat', chatRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/save', saveRoutes); // ✅ Plugged in!

// Default route (optional)
app.get('/', (req, res) => {
  res.send('Legal Bee backend is buzzing 🐝');
});

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
