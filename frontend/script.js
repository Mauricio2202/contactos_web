"use strict";

document.getElementById('addContact').addEventListener('click', function() {
    const name = document.getElementById('name').value;
    const lastName = document.getElementById('lastName').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const happyBirthday = document.getElementById('cumpleaños').value; 

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
        // CAMBIO IMPORTANTE: Usar response.json() en lugar de response.text()
        return response.json();
    })
    .then(data => {
        console.log('Contacto guardado:', data);
        
        // Creamos un elemento de lista
        const li = document.createElement('li');

        // IMPORTANTE: Guardar el ID que devuelve el servidor
        li.setAttribute('data-id', data.id);
        console.log('ID guardado en data-id:', data.id);
        
        li.innerHTML = `
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
            // Obtener el ID guardado en el atributo data-id
            const contactId = li.getAttribute('data-id');
        
            console.log('INICIANDO ELIMINACIÓN');
            console.log('ID del contacto:', contactId);
        
            fetch(`http://localhost:3000/contactos/${contactId}`, {
                method: 'DELETE'
            })
            .then(response => {
                console.log('Respuesta HTTP recibida');
                console.log('Status:', response.status);
                
                if (!response.ok) {
                    throw new Error('Error al eliminar el contacto');
                }
                return response.json();
            })
            .then(data => {
                console.log('Respuesta JSON del servidor:', data);
                
                // Eliminar de la interfaz solo si se eliminó de la BD
                contactList.removeChild(li);
                console.log('Contacto eliminado de la interfaz');
            })
            .catch(error => {
                console.error('Error completo:', error);
                alert('Error al eliminar contacto: ' + error.message);
            });
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