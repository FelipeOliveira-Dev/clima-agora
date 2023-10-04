const keyApi = "e9560af01966ff68961eab7289dd52e7";

const inputCidade = document.querySelector("#input-cidade");
const btnPesquisa = document.querySelector("#buscar");

const elementoCidade = document.querySelector("#cidade");
const elementoTemperatura = document.querySelector("#temperatura span");
const elementoDescricao = document.querySelector("#descricao");
const elementoIconeCLima = document.querySelector("#icone-clima");
const elementoBandeira = document.querySelector("#pais")
const elementoUmidade = document.querySelector("#umidade span");
const elementoVento = document.querySelector("#vento span");

const climaContainer = document.querySelector("#dados-clima");
const msgErro = document.querySelector("#msg-erro");

const pegarDadosDoClima = async (cidade) => {
    const apiCLimaUrl = 'https://api.openweathermap.org/data/2.5/weather?q='+cidade+'&units=metric&appid='+keyApi+'&lang=pt_br';
    const result = await fetch(apiCLimaUrl);
    const dados = await result.json();

    return dados;
}

const mostrarDadosDoClima = async (cidade) => {
    const dados = await pegarDadosDoClima(cidade);
    console.log(dados);
    if (dados.cod == 404){
        climaContainer.classList.add("esconder");
        msgErro.classList.remove("esconder");
    }else{
        elementoCidade.innerText = dados.name;
        elementoTemperatura.innerText = parseInt(dados.main.temp);
        elementoDescricao.innerText = dados.weather[0].description;
        elementoIconeCLima.setAttribute("src", `http://openweathermap.org/img/wn/${dados.weather[0].icon}.png`);
        elementoBandeira.setAttribute("src", `https://flagsapi.com/${dados.sys.country}/flat/64.png`);
        elementoUmidade.innerText = dados.main.humidity+" %";
        elementoVento.innerText = dados.wind.speed+" Km/h";

        msgErro.classList.add("esconder");
        climaContainer.classList.remove("esconder");
    }

    
};

btnPesquisa.addEventListener("click", (e) =>{
    e.preventDefault();
    const cidade = inputCidade.value;
    mostrarDadosDoClima(cidade);
});

inputCidade.addEventListener("keyup", (e) => {
    if(e.code === "Enter"){
        const cidade = e.target.value;
        mostrarDadosDoClima(cidade);
    }
});