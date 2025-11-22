async function carregarVendas() {
    const response = await fetch('http://localhost:3000/vendaCombustivel');
    const vendas = await response.json();

    let html = '<table><tr><th>ID</th><th>Tipo de Combustível</th><th>Preço</th><th>Volume Abastecido</th><th>Data Abastecimento</th><th>Ação</th></tr>';

    vendas.forEach(venda => {
        html += `<tr id="venda-${venda.id}">
        <td>${venda.id}</td>
        <td>${venda.tipo_combustivel}</td>
        <td>${venda.preco}</td>
        <td>${venda.volume_abastecido}</td>
        <td>${venda.data_abastecimento}</td>
        <td><button class="btn-deletar" onclick="deletarVenda(${venda.id})">🗑️</button></td>
        </tr>`;
    });

    html += '</table>';
    document.getElementById('tabelaVendas').innerHTML = html;
}

async function deletarVenda(id) {
    if (!confirm(`Excluir venda ID ${id}?`)) return;

    await fetch(`http://localhost:3000/vendaCombustivel/${id}`, { method: 'DELETE' });
    document.getElementById(`venda-${id}`).remove();
}

window.onload = carregarVendas;