const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('List of solicitudes');
});

router.post('/submit', (req, res) => {
    res.send('Solicitude submitted');
});

router.put('/update', (req, res) => {
    res.send('Solicitude updated');
});

router.delete('/delete', (req, res) => {
    res.send('Solicitude deleted');
})

router.all('/secret', (req, res) => {
    res.send('Accessing the secret section ...')
});

module.exports = router;