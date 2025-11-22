async function listarTodos() {
    const buscaNoBancoDeDados = await fetch('http://localhost:3000/filmes');
    const respostaObtida = await buscaNoBancoDeDados.json();
    console.log(respostaObtida);

    let html = `
        <table>
            <tr>
                <th>Nome</th>
                <th>Gênero</th>
                <th>Duração</th>
                <th>Classificação</th>
                <th>Ano</th>
            </tr>
    `;

    respostaObtida.forEach(filme => {
        html += `
            <tr>
                <td>${filme.nome}</td>
                <td>${filme.genero}</td>
                <td>${filme.duracao} min</td>
                <td>${filme.classificacao}</td>
                <td>${filme.ano}</td>
            </tr>
        `;
    });

    html += '</table>';
    document.getElementById('resultado').innerHTML = html;
}
