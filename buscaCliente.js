async function listarTodos() {
    const buscaNoBancoDeDados = await fetch('http://localhost:3000/clientes');
    const respostaObtida = await buscaNoBancoDeDados.json();
    console.log(respostaObtida);
    let html = '<table border="1"><tr><th>CPF</th><th>Nome</th></tr>';

    respostaObtida.forEach(cliente => {
        html += `<tr><td>${cliente.cpf}</td><td>${cliente.nome}</td></tr>`;
    });

    html += '</table>';
    document.getElementById('resultado').innerHTML = html;
}
