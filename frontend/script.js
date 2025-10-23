"use strict";

document.getElementById('addContact').addEventListener('click', function() {
    const name = document.getElementById('name').value;
    const lastName = document.getElementById('lastName').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const happyBirthday = document.getElementById('cumpleaños').value; // Asegúrate que el ID sea 'cumpleaños'

    const contactList = document.getElementById('contactList');

    fetch('http://localhost:3000/contactos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nombre: name,
            apellido: lastName,
            telefono: phone,
            correo: email,
            cumpleaños: happyBirthday
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error en la respuesta del servidor');
        }
        return response.text(); // Porque el servidor envía texto plano
    })
    .then(data => {
        console.log('Contacto guardado:', data);
        
        // Creamos un elemento de lista
        const li = document.createElement('li');
        
        li.innerHTML = `
            <h2>Nuevo contacto</h2>
            <strong>Nombre:</strong> ${name} <br>
            <strong>Apellido:</strong> ${lastName} <br>
            <strong>Teléfono:</strong> ${phone} <br>
            <strong>Email:</strong> ${email} <br>
            <strong>Cumpleaños:</strong> ${happyBirthday} <br>
            <button class="sendSolicitude">Enviar Solicitud</button>
            <button class="deleteContact">Eliminar Contacto</button>
        `;

        contactList.appendChild(li);

        const sendSolicitude = li.querySelector('.sendSolicitude');
        sendSolicitude.addEventListener('click', function() {
            alert(`Enviando solicitud para ${name} ${lastName}`);
        });

        const deleteContact = li.querySelector('.deleteContact');
        deleteContact.addEventListener('click', function(){
            contactList.removeChild(li);
        });

        // Limpiamos los campos después de agregar un contacto
        document.getElementById('name').value = '';
        document.getElementById('lastName').value = '';
        document.getElementById('phone').value = '';
        document.getElementById('email').value = '';
        document.getElementById('cumpleaños').value = ''; 
    })
    .catch(error => {
        console.error('Error al guardar contacto:', error);
        alert('Error al guardar contacto: ' + error.message);
    });
});