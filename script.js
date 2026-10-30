document.addEventListener("DOMContentLoaded", () => {
  fetch("dados.json")
    .then(response => response.json())
    .then(data => {
      document.getElementById("subtitulo-topo").innerText = data.tituloApp;
      renderizarProvas(data.provas);
    })
    .catch(error => {
      document.getElementById("app").innerHTML = "<p style='color:red; text-align:center;'>Erro ao carregar o dados.json</p>";
    });
});

function renderizarProvas(provas) {
  const main = document.getElementById("app");
  main.innerHTML = "";
  provas.forEach(prova => {
    let card = document.createElement("div");
    card.className = "card";
    let html = `<h3>${prova.turma} - ${prova.nomeProva}</h3><p style="font-size:0.85rem; color:#64748b; margin-bottom:10px;">Questões: ${prova.gabarito.length}</p>`;
    
    prova.gabarito.forEach((correta, index) => {
      html += `
        <div style="margin-bottom: 10px; border-top: 1px solid #f1f5f9; padding-top: 6px;">
          <span style="font-size: 0.85rem; font-weight:600;">Q${index + 1} (Gab: ${correta})</span>
          <div class="opcoes-container" id="q-${prova.id}-${index}">
            ${['A', 'B', 'C', 'D', 'E'].map(letra => `
              <button class="opcao-btn" onclick="verificar(${prova.id}, ${index}, '${letra}', '${correta}')">${letra}</button>
            `).join('')}
          </div>
        </div>
      `;
    });
    card.innerHTML = html;
    main.appendChild(card);
  });
}

function verificar(provaId, questaoIndex, escolhida, correta) {
  const container = document.getElementById(`q-${provaId}-${questaoIndex}`);
  const botoes = container.querySelectorAll('.opcao-btn');
  botoes.forEach(b => { b.style.background = 'white'; b.style.color = '#1e293b'; b.style.borderColor = '#cbd5e1'; });
  const clicado = Array.from(botoes).find(b => b.innerText === escolhida);
  
  if (escolhida === correta) {
    clicado.style.background = '#16a34a'; clicado.style.color = 'white'; clicado.style.borderColor = '#16a34a';
  } else {
    clicado.style.background = '#dc2626'; clicado.style.color = 'white'; clicado.style.borderColor = '#dc2626';
    const certo = Array.from(botoes).find(b => b.innerText === correta);
    if(certo) certo.style.borderColor = '#16a34a';
  }
}
