async function carregarFilmes() {
    const response = await fetch('http://localhost:3000/filmes');
    const filmes = await response.json();

    let html = '<table><tr><th>ID</th><th>Nome</th><th>Gênero</th><th>Duração</th><th>Classificação</th><th>Ano</th><th>Ação</th></tr>';

    filmes.forEach(filme => {
        // Formatando a data do banco YYYY-MM-DD → DD/MM/YYYY
        const dataFormatada = new Date(filme.ano).toLocaleDateString("pt-BR");

        html += `
        <tr id="filme-${filme.id}">
            <td>${filme.id}</td>
            <td>${filme.nome}</td>
            <td>${filme.genero}</td>
            <td>${filme.duracao} min</td>
            <td>${filme.classificacao}</td>
            <td>${dataFormatada}</td>
            <td><button class="btn-deletar" onclick="deletarFilme(${filme.id})">🗑️</button></td>
        </tr>`;
    });

    html += '</table>';
    document.getElementById('tabelaVendas').innerHTML = html;
}

async function deletarFilme(id) {
    if (!confirm(`Excluir filme ID ${id}?`)) return;

    await fetch(`http://localhost:3000/filmes/${id}`, { method: 'DELETE' });

    document.getElementById(`filme-${id}`).remove();
}

window.onload = carregarFilmes;
