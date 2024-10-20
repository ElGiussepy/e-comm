const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const authRoutes = require('./routes/authRoutes'); // Importamos las rutas de autenticación
const Product = require('./models/product'); // Importamos el modelo de producto

const app = express();

// Conectar a MongoDB
const dbURI = 'mongodb+srv://elgiussepy:JereyCarla010116@myweb.ca1b2.mongodb.net/?retryWrites=true&w=majority&appName=MyWeb';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch((err) => console.log('Error al conectar a MongoDB:', err));

// Middleware para analizar JSON
app.use(express.json());

// Servir archivos estáticos desde 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Usar rutas de autenticación
app.use('/auth', authRoutes);

// Ruta para añadir productos
app.post('/add-product', (req, res) => {
    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    });

    product.save()
        .then((result) => res.send(result))
        .catch((err) => res.status(400).send(err));
});

// Ruta para obtener productos
app.get('/products', (req, res) => {
    Product.find()
        .then((products) => res.json(products))
        .catch((err) => res.status(500).json({ error: err.message }));
});

// Servir index.html en la ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
