let editandoId = null;

async function carregarFilmes() {
    const response = await fetch('http://localhost:3000/filmes');
    const filmes = await response.json();

    let html = '<table><tr><th>ID</th><th>Título</th><th>Gênero</th><th>Ano</th><th>Ação</th></tr>';

    filmes.forEach(filme => {
        html += `
        <tr id="filme-${filme.id}">
            <td>${filme.id}</td>
            <td id="c-${filme.id}-0">${filme.titulo}</td>
            <td id="c-${filme.id}-1">${filme.genero}</td>
            <td id="c-${filme.id}-2">${filme.ano}</td>

            <td>
                <button class="btn-editar" onclick="editarFilme(${filme.id})">✏️</button>
            </td>
        </tr>`;
    });

    document.getElementById('tabelaFilmes').innerHTML = html + '</table>';
}

function editarFilme(id) {
    if (editandoId) return alert('Salve ou cancele a edição atual primeiro!');

    editandoId = id;

    document.getElementById(`c-${id}-0`).innerHTML =
        `<input id="i-${id}-0" value="${document.getElementById(`c-${id}-0`).textContent}">`;

    document.getElementById(`c-${id}-1`).innerHTML =
        `<input id="i-${id}-1" value="${document.getElementById(`c-${id}-1`).textContent}">`;

    document.getElementById(`c-${id}-2`).innerHTML =
        `<input type="number" id="i-${id}-2" value="${document.getElementById(`c-${id}-2`).textContent}">`;

    document.querySelector(`#filme-${id} td:last-child`).innerHTML = `
        <button class="btn-salvar" onclick="salvarFilme(${id})">💾</button>
        <button class="btn-cancelar" onclick="cancelarEdicao()">❌</button>
    `;
}

async function salvarFilme(id) {
    const response = await fetch(`http://localhost:3000/filmes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            titulo: document.getElementById(`i-${id}-0`).value,
            genero: document.getElementById(`i-${id}-1`).value,
            ano: document.getElementById(`i-${id}-2`).value
        })
    });

    if (response.ok) {
        editandoId = null;
        carregarFilmes();
    } else {
        alert('Erro ao atualizar!');
    }
}

function cancelarEdicao() {
    editandoId = null;
    carregarFilmes();
}

window.onload = carregarFilmes;
