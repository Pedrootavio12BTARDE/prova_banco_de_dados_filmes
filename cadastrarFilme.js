document.getElementById('formFilme').addEventListener('submit', async function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value;
    const genero = document.getElementById('genero').value;
    const duracao = document.getElementById('duracao').value;
    const classificacao = document.getElementById('classificacao').value;
    const ano = document.getElementById('ano').value;  

    const response = await fetch('http://localhost:3000/cadastroFilme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, genero, duracao, classificacao, ano })
    });

    const data = await response.json();

    if (response.ok) {
        document.getElementById('message').textContent = 'Filme cadastrado!';
        document.getElementById('formFilme').reset();
    } else {
        document.getElementById('message').textContent = 'Erro: ' + data.error;
    }
});
