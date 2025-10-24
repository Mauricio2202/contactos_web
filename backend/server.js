const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const PORT = 3000;

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "contactos_app"
});

db.connect(err => {
    if (err) {
        console.log("Error connection to the database:", err.message);
        return;
    }
    console.log("Connected to the database.");
});

app.get('/api/contactos', (req, res) => {
    db.query("SELECT * FROM contactos", (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    })
});

app.post('/contactos', (req, res) => {
    console.log('Datos recibidos:', req.body); 
    const { nombre, apellido, telefono, correo, cumpleaños } = req.body; 
    db.query(
        'INSERT INTO contactos (nombre, apellido, telefono, email, cumpleaños) VALUES (?, ?, ?, ?, ?)',
        [nombre, apellido, telefono, correo, cumpleaños],
        (err, result) => {
            if (err) {
                console.error('Error en BD:', err); 
                res.status(500).json({ error: 'Error al guardar el contacto' });
            } else {
                res.json({
                    id: result.insertId,
                    mensaje: 'Contacto guardado correctamente'
                })
            }
        }
    );
});

app.delete('/contactos/:id', (req, res) => {
    const { id } = req.params;
    
    console.log('SOLICITUD DELETE RECIBICA');
    console.log('ID a eliminar: ', id);
    console.log('Tipo de ID: ', typeof id);

    db.query('DELETE FROM contactos WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error("Error en DELETE", err);
            res.status(500).json({ error: 'Error al eliminar el contacto' });
        } 
        console.log('Resultado DELETE:', result);
        console.log('Filas afectadas:', result.affectedRows);
        console.log('Mensaje DELETE:', result.message);
        console.log('ID eliminado:', id);

        if (result.affectedRows > 0) {
            res.json({
                mensaje: 'Contacto eliminado correctamente',
                affectedRows: result.affectedRows
            });
        } else {
            console.log('No se encontró el contacto con ID:', id);
            res.status(404).json({ error: 'Contacto no encontrado' });
        }
    });
});

app.get('/', (req, res) => {
    res.send('Hello New Contact');
})

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});