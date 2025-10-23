"use strict";

// Le agregamos un evento de click al botón de agregar contacto y dentro de este inicializaremos todas las constantes necesarias para crear un nuevo contacto.
document.getElementById('addContact').addEventListener('click', function() {
    const name = document.getElementById('name').value;
    const lastName = document.getElementById('lastName').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const happyBirthday = document.getElementById('cumpleaños').value;

    const contactList = document.getElementById('contactList');

    // Creamos un elemento de lista
    const li = document.createElement('li');
    
    // A ese elemento le insertamos el código html de lo que hemos obtenido con los values de los inputs
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

    // Agregamos el elemento li a la lista de contactos
    contactList.appendChild(li);

    const sendSolicitude = li.querySelector('.sendSolicitude');
    sendSolicitude.addEventListener('click', function() {
        alert(`Enviando solicitud para ${name} ${lastName}`);

        // Aquí puedes agregar la lógica para enviar la solicitud al backend
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
});