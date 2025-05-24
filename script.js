document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formAgendamento');
    const listaAgendamentos = document.getElementById('agendamentos');
    
    // Array para armazenar os agendamentos
    let agendamentos = [];
    
    // Verifica se já existem agendamentos salvos
    if (localStorage.getItem('agendamentos')) {
        agendamentos = JSON.parse(localStorage.getItem('agendamentos'));
        atualizarLista();
    }
    
    // Adiciona um novo agendamento
    form.addEventListener('submit', function(e) {
        e.preventDefault(); // Evita recarregar a página
        
        const nomeCliente = document.getElementById('nomeCliente').value;
        const servico = document.getElementById('servico').value;
        const data = document.getElementById('data').value;
        const hora = document.getElementById('hora').value;
        
        // Formata a data para exibição (ex: 24/05/2025)
        const dataFormatada = new Date(data).toLocaleDateString('pt-BR');
        
        // Cria um objeto de agendamento
        const agendamento = {
            id: Date.now(), // ID único
            nomeCliente,
            servico,
            data: dataFormatada,
            hora
        };
        
        // Adiciona ao array
        agendamentos.push(agendamento);
        
        // Salva no localStorage (para não perder ao recarregar)
        localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
        
        // Atualiza a lista na tela
        atualizarLista();
        
        // Limpa o formulário
        form.reset();
    });
    
    // Função para atualizar a lista de agendamentos
    function atualizarLista() {
        listaAgendamentos.innerHTML = '';
        
        agendamentos.forEach(agendamento => {
            const item = document.createElement('div');
            item.className = 'agendamento-item';
            item.innerHTML = `
                <h3>${agendamento.nomeCliente}</h3>
                <p><strong>Serviço:</strong> ${agendamento.servico}</p>
                <p><strong>Data:</strong> ${agendamento.data}</p>
                <p><strong>Hora:</strong> ${agendamento.hora}</p>
                <button onclick="removerAgendamento(${agendamento.id})">Cancelar</button>
            `;
            
            listaAgendamentos.appendChild(item);
        });
    }
    
    // Função para remover um agendamento
    window.removerAgendamento = function(id) {
        agendamentos = agendamentos.filter(ag => ag.id !== id);
        localStorage.setItem('agendamentos', JSON.stringify(agendamentos));
        atualizarLista();
    };
});