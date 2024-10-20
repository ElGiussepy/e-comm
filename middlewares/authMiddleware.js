const jwt = require('jsonwebtoken');
const JWT_SECRET = 'miSuperSecretoParaFirmarTokens';

// Middleware para verificar el token
const requireAuth = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Acceso denegado. Token no proporcionado.' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId; // Guardamos el ID del usuario en la request
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token no válido.' });
    }
};

module.exports = requireAuth;
