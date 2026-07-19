const getApi = (req, res) => {
    res.json({
        mensaje: 'API funcionando',
        estado: 'activo',
        rutas: [
            '/api/usuarios',
            '/api/productos'
        ]
    });
};

const getUsuarios = (req, res) => {
    const usuarios = [
        { id: 1, nombre: 'Usuario 1', email: 'usuario1@example.com' },
        { id: 2, nombre: 'Usuario 2', email: 'usuario2@example.com' },
        { id: 3, nombre: 'Usuario 3', email: 'usuario3@example.com' }
    ];
    
    res.json({
        usuarios,
        total: usuarios.length
    });
};

const getProductos = (req, res) => {
    const productos = [
        { id: 1, nombre: 'Producto A', precio: 100, stock: 10 },
        { id: 2, nombre: 'Producto B', precio: 200, stock: 5 },
        { id: 3, nombre: 'Producto C', precio: 150, stock: 8 }
    ];
    
    res.json({
        productos,
        total: productos.length
    });
};

module.exports = {
    getApi,
    getUsuarios,
    getProductos
};