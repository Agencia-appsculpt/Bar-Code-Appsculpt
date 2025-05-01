window.addEventListener('load', () => {
    document.getElementById('welcomePopup').classList.add('show');
    document.getElementById('welcomeOverlay').classList.add('show');
  });
  
  function fecharBoasVindas() {
    document.getElementById('welcomePopup').classList.remove('show');
    document.getElementById('welcomeOverlay').classList.remove('show');
  }
  
  document.getElementById('btnGerar').addEventListener('click', () => {
    const raw = document.getElementById('valores').value;
    const valores = raw.trim().split('\n').map(v => v.trim()).filter(v => v);
    if (!valores.length) return alert('Digite ao menos um valor!');
  
    // Exibir o carregamento
    mostrarCarregando();
  
    const params = {
      dados: JSON.stringify(valores),
      tipo: document.getElementById('tipo').value,
      rotacao: document.getElementById('rotacao').value,
      fonte: document.getElementById('fonte').value,
      tamanhoFonte: document.getElementById('tamanhoFonte').value,
      altura: document.getElementById('altura').value,
      tamanho: document.getElementById('tamanho').value,
      margem: document.getElementById('margem').value
    };
    const qs = Object.entries(params)
      .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
      .join('&');
    window.location.href = `codigos.html?${qs}`;
  });
  
  // Função para abrir o popup
  function abrirPopup() {
    document.getElementById('popup').classList.add('show');
    document.getElementById('overlay').classList.add('show');
  }
  
  function fecharPopup() {
    document.getElementById('popup').classList.remove('show');
    document.getElementById('overlay').classList.remove('show');
  }
  
  // Função para exibir o carregamento
  function mostrarCarregando() {
    document.getElementById('loadingOverlay').style.display = 'flex'; // Exibe o overlay de carregamento
    
    setTimeout(() => {
      document.getElementById('loadingOverlay').style.display = 'none'; // Esconde o overlay após 4 segundos
    }, 3000); // 4 segundos de duração do carregamento
  }
  
  function gerarCodigosAleatorios() {
    // Exibe o carregamento
    mostrarCarregando();
  
    document.getElementById('loading').style.display = 'block'; // Exibe a mensagem de carregamento
  
    const qtd = parseInt(document.getElementById('qtdCodigos').value);
    const prefixo = document.getElementById('prefixo').value || '';
    const sufixo = document.getElementById('sufixo').value || '';
    const tipo = document.getElementById('tipoAleatorio').value;
    const lista = [];
  
    let comprimentoBase;
    switch (tipo) {
      case 'EAN13':
        comprimentoBase = 13;
        break;
      case 'UPC':
        comprimentoBase = 12;
        break;
      case 'CODE128':
        comprimentoBase = 20;
        break;
      case 'Code39':
        comprimentoBase = 10;
        break;
      case 'Code11':
        comprimentoBase = 11;
        break;
      default:
        comprimentoBase = 8;
    }
  
    for (let i = 0; i < qtd; i++) {
      let parteAleatoria = '';
      const comprimentoAleatorio = comprimentoBase - prefixo.length - sufixo.length;
  
      if (tipo === 'EAN13' || tipo === 'UPC' || tipo === 'Code11') {
        for (let j = 0; j < comprimentoAleatorio; j++) {
          parteAleatoria += Math.floor(Math.random() * 10).toString();
        }
      } else if (tipo === 'CODE128' || tipo === 'Code39') {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        for (let j = 0; j < comprimentoAleatorio; j++) {
          parteAleatoria += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
      }
  
      lista.push(`${prefixo}${parteAleatoria}${sufixo}`);
    }
  
    const texto = lista.join('\n');
    document.getElementById('codigosGerados').value = texto;
    document.getElementById('valores').value = texto;
  
    // Esconde o carregamento após a geração dos códigos
    document.getElementById('loading').style.display = 'none';
  }
  
  function copiarParaArea() {
    const txt = document.getElementById('codigosGerados');
    navigator.clipboard.writeText(txt.value).then(() => {
      alert('Códigos copiados para a área de transferência!');
    }).catch(err => {
      alert('Falha ao copiar: ' + err);
    });
  }
  