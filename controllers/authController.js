const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const JWT_SECRET = 'miSuperSecretoParaFirmarTokens'; // En producción debería ir en variables de entorno

// Registro de usuario
exports.register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'El correo ya está registrado' });
        }

        // Crear un nuevo usuario
        const newUser = new User({ name, email, password });
        await newUser.save();

        // Crear y firmar un token
        const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ token, user: newUser });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Login de usuario
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Verificar si el usuario existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
        }

        // Comparar contraseñas
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Correo o contraseña incorrectos' });
        }

        // Crear y firmar un token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token, user });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
