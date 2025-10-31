// Seleção dos elementos do DOM
const songName = document.getElementById("song-name"); 
const bandName = document.getElementById("band-name"); 
const song = document.getElementById("audio"); 
const cover = document.getElementById("cover"); 
const play = document.getElementById("play"); 
const next = document.getElementById("next"); 
const previous = document.getElementById("previous");

// Constantes de informações das músicas
const vambora = {
    songName: "Vambora",
    file: "adriana_calcanhoto_vambora",
    artist: "Adriana Calcanhoto",
};

const tentaAcreditar = {
    songName: "Tenta Acreditar", 
    file: "ana_vitoria_tenta_acreditar",
    artist: "ANAVITÓRIA",
};

const naoSeiDancar = {
    songName: "Não Sei Dançar", 
    file: "marina_lima_nao_sei_dancar",
    artist: "Marina Lima",
};

const cincoMinutos = {
    songName: "Cinco Minutos", 
    file: "marisa_monte_cinco_minutos",
    artist: "Marisa Monte",
};

const naoEfacil = {
    songName: "Não é Fácil", 
    file: "marisa_monte_nao_e_facil",
    artist: "Marisa Monte",
};

const naoOlhePraTras  = {
    songName: "Não Olhe Pra Trás", 
    file: "capital_inicial_nao_olhe_pra_tras",
    artist: "Capital Inicial",
};

const lanternaDosAfogados = {
    songName: "Lanterna Dos Afogados", 
    file: "cassia_eller_lanterna_dos_afogados",
    artist: "Cássia Eler",
};

const obrigadoPorTerSeMandado = {
    songName: "Obrigado Por Ter Se Mandado", 
    file: "cassia_eller_obrigado_por_ter_se_mandado",
    artist: "Cássia Eller",
};

const comoEuQuero = {
    songName: "Como Eu Quero", 
    file: "kid_abelha_como_eu_quero",
    artist: "Kid Abelha",
};

const ouvirEstrelas = {
    songName: "Ouvir Estrelas", 
    file: "kid_abelha_ouvir_estrelas",
    artist: "Kid Abelha",
};

// Playlist e controle de estado
const playlist = [vambora, tentaAcreditar, naoSeiDancar, cincoMinutos, naoEfacil, naoOlhePraTras, lanternaDosAfogados, obrigadoPorTerSeMandado, comoEuQuero, ouvirEstrelas];
let index = 0;
let isPlaying = false;

// Função para inicializar a música atual
function initializeSong() {
    cover.src = `./imagem/${playlist[index].file}.jpg`;
    songName.innerText = playlist[index].songName;
    bandName.innerText = playlist[index].artist;
    song.src = `../songs/${playlist[index].file}.mp3`;
}

// Função para tocar a música
function playSong() { 
    play.querySelector(".bi").classList.remove("bi-play-circle-fill");
    play.querySelector(".bi").classList.add("bi-pause-circle-fill");
    song.play(); 
    isPlaying = true;
}

// Função para pausar a música
function pauseSong() {
    play.querySelector(".bi").classList.add("bi-play-circle-fill"); 
    play.querySelector(".bi").classList.remove("bi-pause-circle-fill"); 
    song.pause(); 
    isPlaying = false;   
}

// Decide entre play ou pause
function playPauseDecider() {
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
}

// Função para ir para a música anterior
function previousSong() {
    if (index === 0) {
        index = playlist.length - 1;
    } else {
        index -= 1;
    }
    initializeSong();
    playSong();
}

// Função para ir para a próxima música
function nextSong() { 
    if (index === playlist.length - 1) { 
        index = 0; 
    } else { 
        index += 1; 
    }
    initializeSong(); 
    playSong(); 
}

// Eventos de clique
play.addEventListener("click", playPauseDecider);
next.addEventListener("click", nextSong);
previous.addEventListener("click", previousSong);

// Inicializa a primeira música ao carregar
initializeSong();

const currentProgress = document.getElementById("current-progress")


function updateProgressBar() {
    const barWidth = (song.currentTime / song.duration) * 100;
    currentProgress.style.setProperty('--progress', `${barWidth}%`);
}

// Atualiza a barra de progresso conforme a música toca
song.addEventListener('timeupdate', updateProgressBar);

// Seleciona o container da barra de progresso
const progressContainer = document.getElementById("progress-container");

// Adiciona o evento de clique para pular para um ponto da música
progressContainer.addEventListener("click", jumpTo);

// Função que calcula o tempo correspondente ao clique e atualiza a música
function jumpTo(event) {
    const width = progressContainer.clientWidth; // largura total da barra
    const clickPosition = event.offsetX; // posição do clique dentro da barra
    const jumpToTime = (clickPosition / width) * song.duration; // calcula tempo proporcional
    song.currentTime = jumpToTime; // atualiza o tempo da música
}
