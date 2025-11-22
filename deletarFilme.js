async function carregarFilmes() {
    try {
        // ✅ Usando a rota correta do backend
        const response = await fetch('http://localhost:3000/filmes');
        if (!response.ok) throw new Error('Erro ao buscar filmes');

        const filmes = await response.json();

        let html = '<table border="1"><tr><th>ID</th><th>Nome</th><th>Gênero</th><th>Duração</th><th>Classificação</th><th>Ano</th><th>Ação</th></tr>';

        filmes.forEach(filme => {
            html += `
                <tr id="filme-${filme.id}">
                    <td>${filme.id}</td>
                    <td>${filme.nome}</td>
                    <td>${filme.genero}</td>
                    <td>${filme.duracao}</td>
                    <td>${filme.classificacao}</td>
                    <td>${new Date(filme.ano).toISOString().split('T')[0]}</td>
                    <td><button class="btn-deletar" onclick="deletarFilme(${filme.id})">🗑️</button></td>
                </tr>
            `;
        });

        html += '</table>';
        document.getElementById('tabelaFilmes').innerHTML = html;
    } catch (error) {
        console.error(error);
        document.getElementById('tabelaFilmes').textContent = 'Erro ao carregar filmes.';
    }
}

async function deletarFilme(id) {
    if (!confirm(`Deseja excluir o filme ID ${id}?`)) return;

    try {
        // ✅ Usando a rota correta do backend
        const response = await fetch(`http://localhost:3000/filmes/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Erro ao deletar filme');

        document.getElementById(`filme-${id}`).remove();
        alert('Filme excluído com sucesso!');
    } catch (error) {
        console.error(error);
        alert('Erro ao excluir filme.');
    }
}

window.onload = carregarFilmes;
