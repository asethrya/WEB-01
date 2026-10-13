let filmes = [
    { titulo: "Como Eu Era Antes de Você", ano: 2016, genero: "Romance", nota: 7.4, poster: "assets/como_eu_era.jpeg" },
    { titulo: "Senhor dos Anéis: O Retorno do Rei", ano: 2003, genero: "Fantasia", nota: 9.0, poster: "assets/senhor_dos_clubs.jpeg" },
    { titulo: "Harry Potter e as Relíquias da Morte - Parte 2", ano: 2011, genero: "Fantasia", nota: 8.1, poster: "assets/Reliquias_do_clubs.jpeg" },
    { titulo: "O Lobisomem", ano: 2010, genero: "Terror", nota: 9.9, poster: "assets/o_lobisomem.jpeg" },
    { titulo: "Matrix", ano: 1999, genero: "Ficção", nota: 8.7, poster: "assets/matrix.jpeg" },
    { titulo: "Toy Story", ano: 1995, genero: "Animação", nota: 8.3, poster: "assets/toy_story.jpeg" },
    { titulo: "Batman", ano: 2022, genero: "Ação", nota: 7.8, poster: "assets/batman.jpeg" },
    { titulo: "Através da Minha Janela", ano: 2022, genero: "Romance", nota: 5.5, poster: "assets/atraves.jpeg" }
];

let grade = document.getElementById("grade-filmes");
let contador = document.getElementById("contador");

let filmesExibidos = [];
let favoritos = [];
let listaFavoritos = document.getElementById("lista-favoritos");
let contadorFavoritos = document.getElementById("contador-favoritos");

function mostrarFilmes(lista) {
    grade.innerHTML = "";
    contador.innerText = lista.length;
    filmesExibidos = lista;

    if (lista.length == 0) {
        grade.innerHTML = '<p class="sem-resultados">Nenhum filme encontrado</p>';
    } else {
        for (let i = 0; i < lista.length; i++) {
            let filme = lista[i];
            let selo = filme.nota >= 8 ? "⭐ Recomendado" : "";

            grade.innerHTML +=
                '<div class="card-filme">' +
                    '<img src="' + filme.poster + '" alt="Pôster de ' + filme.titulo + '">' +
                    '<h3>' + filme.titulo + '</h3>' +
                    '<p>Ano: ' + filme.ano + '</p>' +
                    '<p>Gênero: ' + filme.genero + '</p>' +
                    '<p>Nota: ' + filme.nota + '</p>' +
                    '<p class="selo">' + selo + '</p>' +
                    '<button onclick="favoritar(' + i + ')">♥ Favoritar</button>' +
                '</div>';
        }
    }
}

let busca = document.getElementById("busca");
let filtroGenero = document.getElementById("filtro-genero");

function aplicarFiltros() {
    let textoBusca = busca.value.toLowerCase();
    let resultado = [];
    let generoEscolhido = filtroGenero.value;

    for (let i = 0; i < filmes.length; i++) {
        let titulo = filmes[i].titulo.toLowerCase();

        if (generoEscolhido == "Todos") {
            if (titulo.includes(textoBusca)) {
                resultado.push(filmes[i]);
            }
        } else {
            if (filmes[i].genero == generoEscolhido && titulo.includes(textoBusca)) {
                resultado.push(filmes[i]);
            }
        }
    }

    mostrarFilmes(resultado);
}

busca.addEventListener("input", aplicarFiltros);
filtroGenero.addEventListener("change", aplicarFiltros);

document.getElementById("btn-inverter").addEventListener("click", function () {
    filmes.reverse();
    aplicarFiltros();
});

function favoritar(indice) {
    let titulo = filmesExibidos[indice].titulo;

    if (!favoritos.includes(titulo)) {
        favoritos.push(titulo);
    }

    mostrarFavoritos();
}

function mostrarFavoritos() {
    contadorFavoritos.innerText = favoritos.length;
    listaFavoritos.innerHTML = "";

    for (let i = 0; i < favoritos.length; i++) {
        listaFavoritos.innerHTML += "<li>" + favoritos[i] + "</li>";
    }
}

document.getElementById("btn-limpar-favoritos").addEventListener("click", function () {
    favoritos = [];
    mostrarFavoritos();
});

let tituloCatalogo = document.getElementById("titulo-catalogo");

tituloCatalogo.addEventListener("mouseenter", function () {
    tituloCatalogo.style.color = "#ff4040";
});

tituloCatalogo.addEventListener("mouseout", function () {
    tituloCatalogo.style.color = "yellow";
});

mostrarFilmes(filmes);
mostrarFavoritos();
