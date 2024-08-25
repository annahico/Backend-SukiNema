const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Importa las rutas
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const cinemaRoutes = require('./routes/cinemaRoutes');
const movieRoutes = require('./routes/movieRoutes');
const showRoutes = require('./routes/showRoutes');

// Middleware
app.use(express.json());

// Usa las rutas
app.use('/api/users', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/cinemas', cinemaRoutes);
app.use('/api/movies', movieRoutes);
app.use('/api/shows', showRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
