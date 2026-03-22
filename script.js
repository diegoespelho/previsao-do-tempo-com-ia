/*
    Lógica de Programação
    - Algoritmo (Receita de Bolo - Passo a Passo)

      Fluxo básico
      [x] Descobrir quando o botão foi clicado
      [x] Pegar o nome da cidade no input
      [x] Enviar a cidade para o servidor
      [ ] Pegar a resposta e colocar na tela

      Fluxo de voz
      [ ] Descobrir quando o botão foi clicado
      [ ] Comecar a ouvir e pegar a transcrição
      [ ] Enviar a transcrição para o servidor
      [ ] Pegar a resposta e colocar na tela

      Fluxo da IA
      [ ] Pegar os dados da cidade
      [ ] Enviar os dados para a IA
      [ ] Colocar os dados na tela
*/

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
    <button class="botao-ia">Sugestão de Roupa</button>
    <p class="resposta-ia">Resposta da IA</p>
  `;

  console.log(dadosJson);
}
