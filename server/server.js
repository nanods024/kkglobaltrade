const path = require('path');
const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');

const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const enquiryRoutes = require('./routes/enquiryRoutes');
const contactRoutes = require('./routes/contactRoutes');
const companyRoutes = require('./routes/companyRoutes');

connectDB();

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  ...(process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',').map((value) => value.trim()).filter(Boolean) : []),
  ...(process.env.CLIENT_URLS ? process.env.CLIENT_URLS.split(',').map((value) => value.trim()).filter(Boolean) : []),
];

// --- Security & core middleware ---
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true,
  })
);
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(mongoSanitize());

if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

const limiter = rateLimit({
  windowMs: (Number(process.env.RATE_LIMIT_WINDOW_MINUTES) || 15) * 60 * 1000,
  max: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 200,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', limiter);

// Serve locally-uploaded product images (fallback when Cloudinary isn't configured)
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// --- API routes ---
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/company', companyRoutes);

app.get('/', (req, res) =>
  res.json({
    success: true,
    message: 'KK Global Trade API is running',
    environment: process.env.NODE_ENV || 'development',
  })
);

app.get('/health', (req, res) =>
  res.json({
    success: true,
    message: 'Healthy',
    environment: process.env.NODE_ENV || 'development',
  })
);

app.get('/api/health', (req, res) => res.json({ success: true, message: 'KK Global Trade API is running' }));

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`KK Global Trade API listening on port ${PORT} [${process.env.NODE_ENV || 'development'}]`);
});

module.exports = app;
