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
                res.status(500).send('Error al guardar el contacto');
            } else {
                console.log('Contacto insertado ID:', result.insertId);
                res.send('Contacto guardado correctamente');
            }
        }
    );
});

app.delete('/contactos/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM contactos WHERE id = ?', [id], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error al eliminar contacto');
        } else {
            res.send('Contacto eliminado correctamente');
        }
    });
});

app.get('/', (req, res) => {
    res.send('Hello New Contact');
})

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`);
});