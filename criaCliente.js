document.getElementById('formCliente').addEventListener('submit', async function (e) {
    e.preventDefault();

    const cpf = document.getElementById('cpf').value;
    const nome = document.getElementById('nome').value;

    const response = await fetch('http://localhost:3000/cliente', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cpf, nome })
    });

    const data = await response.json();

    if (response.ok) {
        document.getElementById('message').textContent = 'Cliente cadastrado!';
        document.getElementById('formCliente').reset();
    } else {
        document.getElementById('message').textContent = 'Erro: ' + data.error;
    }
});


