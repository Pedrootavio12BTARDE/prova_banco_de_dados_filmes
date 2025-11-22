let editandoId = null;

async function carregarFilmes() {
    const response = await fetch('http://localhost:3000/filmes');
    const filmes = await response.json();

    let html = `
        <table>
            <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Gênero</th>
                <th>Duração</th>
                <th>Classificação</th>
                <th>Ano de Lançamento</th>
                <th>Ações</th>
            </tr>
    `;

    filmes.forEach(filme => {
        const dataCorreta = filme.ano.split("T")[0];

        html += `
        <tr id="filme-${filme.id}">
            <td>${filme.id}</td>

            <td id="c-${filme.id}-0">${filme.nome}</td>
            <td id="c-${filme.id}-1">${filme.genero}</td>
            <td id="c-${filme.id}-2">${filme.duracao}</td>
            <td id="c-${filme.id}-3">${filme.classificacao}</td>

            <td id="c-${filme.id}-4" data-val="${dataCorreta}">
                ${dataCorreta}
            </td>

            <td>
                <button class="btn-editar" onclick="editarFilme(${filme.id})">✏️</button>
            </td>
        </tr>`;
    });

    html += `</table>`;
    document.getElementById("tabelaFilmes").innerHTML = html;
}

function editarFilme(id) {
    if (editandoId) return alert("Finalize a edição atual primeiro!");
    editandoId = id;

    document.getElementById(`c-${id}-0`).innerHTML =
        `<input id="i-${id}-0" value="${document.getElementById(`c-${id}-0`).textContent}">`;

    document.getElementById(`c-${id}-1`).innerHTML =
        `<input id="i-${id}-1" value="${document.getElementById(`c-${id}-1`).textContent}">`;

    document.getElementById(`c-${id}-2`).innerHTML =
        `<input type="number" id="i-${id}-2" value="${document.getElementById(`c-${id}-2`).textContent}">`;

    document.getElementById(`c-${id}-3`).innerHTML =
        `<input id="i-${id}-3" value="${document.getElementById(`c-${id}-3`).textContent}">`;

    const data = document.getElementById(`c-${id}-4`).getAttribute("data-val");
    document.getElementById(`c-${id}-4`).innerHTML =
        `<input type="date" id="i-${id}-4" value="${data}">`;

    document.querySelector(`#filme-${id} td:last-child`).innerHTML = `
        <button class="btn-salvar" onclick="salvarFilme(${id})">💾</button>
        <button class="btn-cancelar" onclick="cancelarEdicao()">❌</button>
    `;
}

async function salvarFilme(id) {
    const response = await fetch(`http://localhost:3000/filmes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            nome: document.getElementById(`i-${id}-0`).value,
            genero: document.getElementById(`i-${id}-1`).value,
            duracao: document.getElementById(`i-${id}-2`).value,
            classificacao: document.getElementById(`i-${id}-3`).value,
            ano: document.getElementById(`i-${id}-4`).value // <-- NOME DA TABELA!!!
        })
    });

    if (response.ok) {
        editandoId = null;
        carregarFilmes();
    } else {
        alert("Erro ao atualizar!");
    }
}

function cancelarEdicao() {
    editandoId = null;
    carregarFilmes();
}

window.onload = carregarFilmes;
