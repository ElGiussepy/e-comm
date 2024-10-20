const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const { engine } = require('express-handlebars');
const authRoutes = require('./routes/authRoutes'); // Rutas de autenticación
const Product = require('./models/product'); // Modelo de producto

const app = express();

// Configurar Handlebars como motor de plantillas
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

// Conectar a MongoDB
const dbURI = 'mongodb+srv://elgiussepy:JereyCarla010116@myweb.ca1b2.mongodb.net/?retryWrites=true&w=majority&appName=MyWeb';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a MongoDB'))
    .catch((err) => console.log('Error al conectar a MongoDB:', err));

// Middleware para analizar JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Servir archivos estáticos desde 'public'
//app.use(express.static(path.join(__dirname, 'public')));

// Rutas de autenticación
app.use('/auth', authRoutes); // Aquí incluimos las rutas del archivo authRoutes.js

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

// Ruta principal - Renderiza la página con Handlebars
app.get('/', (req, res) => {
    res.render('home'); // Renderiza la vista 'home.handlebars'
});

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
