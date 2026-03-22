/*
    Lógica de Programação
    - Algoritmo (Receita de Bolo - Passo a Passo)

      Fluxo básico
      [x] Descobrir quando o botão foi clicado
      [x] Pegar o nome da cidade no input
      [x] Enviar a cidade para o servidor
      [x] Pegar a resposta e colocar na tela

      Fluxo de voz
      [x] Descobrir quando o botão foi clicado
      [x] Comecar a ouvir e pegar a transcrição
      [x] Enviar a transcrição para o servidor
      [x] Pegar a resposta e colocar na tela

      Fluxo da IA
      [x] Pegar os dados da cidade
      [x] Enviar os dados para a IA
      [x] Colocar os dados na tela
*/

let chaveIA = "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";

async function cliqueiNoBotao() {
  let cidade = document.querySelector(".input-cidade").value;
  let caixa = document.querySelector(".caixa-media");
  let chave = "a41f12fb19f1785902edc0be96dbbbee";
  let endereco = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cidade)}&appid=${chave}&units=metric&lang=pt_br`;

  let respostaServidor = await fetch(endereco);
  let dadosJson = await respostaServidor.json();

  caixa.innerHTML = `
    <h2 class="cidade">${dadosJson.name}</h2>
    <p class="temp">${Math.floor(dadosJson.main.temp)}°C</p>
    <img class="icone" src="https://openweathermap.org/img/wn/${dadosJson.weather[0].icon}.png">
    <p class="umidade">Umidade: ${dadosJson.main.humidity}%</p>
    <button class="botao-ia" onclick="pedirSugestaoRoupa()">Sugestão de Roupa</button>
    <p class="resposta-ia"></p>
  `;

  console.log(dadosJson);
}

function detectaVoz() {
  let reconhecimento = new window.webkitSpeechRecognition();
  reconhecimento.lang = "pt-BR";
  reconhecimento.start();

  reconhecimento.onresult = function (evento) {
    let textoTranscrito = evento.results[0][0].transcript;
    document.querySelector(".input-cidade").value = textoTranscrito;

    cliqueiNoBotao();
  };
}

async function pedirSugestaoRoupa() {
  let temperatura = document.querySelector(".temp").textContent;
  let umidade = document.querySelector(".umidade").textContent;
  let cidade = document.querySelector(".cidade").textContent;

  let resposta = await fetch(
    "https://api.groq.com/openai/v1/chat/completions",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Bearer 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",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [
          {
            role: "user",
            content: `Me dê uma sugestão de qual roupa usar hoje. 
            Estou na cidade de ${cidade}, a temperatura atual é: ${temperatura}
            e a umidade está em: ${umidade}.
            Me dê sugestões em duas frases curtas.`,
          },
        ],
      }),
    },
  );

  let dados = await resposta.json();
  document.querySelector(".resposta-ia").innerHTML =
    dados.choices[0].message.content;
}
