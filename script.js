"use strict";

// Le agregamos un evento de click al botón de agregar contacto y dentro de este inicializaremos todas las constantes necesarias para crear un nuevo contacto.
document.getElementById('addContact').addEventListener('click', function() {
    const name = document.getElementById('name').value;
    const lastName = document.getElementById('lastName').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const happyBirthday = document.getElementById('cumpleaños').value;

    const contactList = document.getElementById('contactList');

    const li = document.createElement('li');
    
    li.innerHTML = `
        <strong>Nombre:</strong> ${name} <br>
        <strong>Apellido:</strong> ${lastName} <br>
        <strong>Teléfono:</strong> ${phone} <br>
        <strong>Email:</strong> ${email} <br>
        <strong>Cumpleaños:</strong> ${happyBirthday} <br>
    `;

    contactList.appendChild(li);

    document.getElementById('name').value = '';
    document.getElementById('lastName').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('email').value = '';
    document.getElementById('cumpleaños').value = '';
});