/**
* Jogo da Forca - Vanilla JS
* File: script.js
* Author: Caio Piassali
* Github: https://github.com/caiopiassali
* Date: 31/10/2018
*/

window.onload = iniciar;

letras = ['Q','W','E','R','T','Y','U','I','O','P','A','S','D','F','G','H','J','K','L','Z','X','C','V','B','N','M'];
categorias = ["Animal","Cidade","Nome","Fruta","Cor","País","Profissão","Esporte","Instrumento Musical","Arma","Linguagem de Programação"];
palavras = ["bode", "cavalo", "gato", "cachorro", "pato", "camelo", "crocodilo", "dinossauro", "burro", "arara",
        "guarulhos", "campinas", "jales", "fortaleza", "roma", "veneza", "paris", "barcelona", "madrid", "miami",
        "gustavo","thiago","emanuele","gabriel","carolina","vitor","cristiano","ronaldo","jozefa","antonia",
        "abacaxi","abacate","pera","morango","laranja","kiwi","caqui","acerola","melancia","banana",
        "azul","amarelo","vermelho","verde","laranja","preto","violeta","magenta","prata","cinza",
        "espanha","portugal","holanda","alemanha","peru","quatemala","china","inglaterra","argentina","dinamarca",
        "pedreiro","programador","vendedor","designer","arquiteto","funileiro","professor","cozinheiro","faxineiro","medico",
        "futebol","boxe","voleibol","handebol","beisebol","xadrez","hipismo","esgrima","automobilismo","maratona",
        "bateria","guitarra","harpa","sanfona","saxofone","flauta","piano","baixo","trompete","violoncelo",
        "faca","espingarda","carabina","pistola","fuzil","metralhadora","peixeira","escopeta","minigun","canivete",
        "lava","java","ruby","python","cobol","clipper","assembly","javascript","pascal","html"];
codigoLetras = [81,87,69,82,84,89,85,73,79,80,65,83,68,70,71,72,74,75,76,90,88,67,86,66,78,77];
erros = 0;
acertos = 0;

function iniciar() {
    criarDvInputLetras();
    criarDvDica();
    criarDvTeclado();
    criarDvForca();

    document.addEventListener('keydown', function(event) {
        for (i = 0; i < letras.length; i++) {
            if (codigoLetras[i] == event.keyCode) {
                if (document.getElementById("tecla"+i).disabled != true) {
                    verificarLetra(letras[i].toLowerCase(),'tecla'+i);
                }
            }
        }
    }, false);
}

function criarDvInputLetras() {
    random = Math.ceil(Math.random() * palavras.length - 1);

    palavraSorteada = palavras[random];

    var dvletras = document.createElement("DIV");
    dvletras.setAttribute("class","dv-letras");
    var center = document.createElement("CENTER");
    for (i = 0; i < palavraSorteada.length; i++) {
        var ipt = document.createElement("INPUT");
        ipt.setAttribute("type", "text");
        ipt.setAttribute("id", "letra" + i);
        ipt.setAttribute("class","ipt-letra");
        ipt.setAttribute("disabled", "true");
        center.appendChild(ipt);
    }
    dvletras.appendChild(center);
    document.body.appendChild(dvletras);
}

function criarDvDica() {
    var dvdica = document.createElement("DIV");
    dvdica.setAttribute("class","dv-dica");
    var center = document.createElement("CENTER");
    var p = document.createElement("P");
    p.setAttribute("id","dica");
    center.appendChild(p);
    dvdica.appendChild(center);
    document.body.appendChild(dvdica);

    document.getElementById("dica").innerHTML = "Dica: "+categorias[parseInt(random / 10)];
}


function criarDvTeclado() {
    var dvteclado = document.createElement("DIV");
    dvteclado.setAttribute("class","dv-teclado");
    dvteclado.setAttribute("id","dv-teclado");
    var center = document.createElement("CENTER");
    for (i = 0; i < letras.length; i++) {
        if (i == 10 || i == 19) {
            var br = document.createElement("BR");
            center.appendChild(br);
        }
        var tecla = document.createElement("BUTTON");
        tecla.setAttribute("class","btn-letra");
        tecla.setAttribute("id","tecla"+i);
        tecla.setAttribute("value",letras[i].toLowerCase());
        tecla.setAttribute("onclick","verificarLetra(this.value,this.id)");
        var teclatexto = document.createTextNode(letras[i]);
        tecla.appendChild(teclatexto);
        center.appendChild(tecla);
    }
    dvteclado.appendChild(center);
    document.body.appendChild(dvteclado);
}

function criarDvForca() {
    var dvforca = document.createElement("DIV");
    dvforca.setAttribute("class","dv-forca");
    var center = document.createElement("CENTER");
    var img = document.createElement("IMG");
    img.setAttribute("src","images/forca-0.jpg");
    img.setAttribute("id","boneco");
    center.appendChild(img);
    dvforca.appendChild(center);
    document.body.appendChild(dvforca);
}

function criarDvJogarNovamente() {
    var dvnovamente = document.createElement("DIV");
    dvnovamente.setAttribute("class","dv-novamente");
    var center = document.createElement("CENTER");
    var btnnovamente = document.createElement("BUTTON");
    btnnovamente.setAttribute("class","btn-novamente");
    btnnovamente.setAttribute("onclick","recarregarPagina()");
    var btnnovamentetext = document.createTextNode("Jogar Novamente!");
    btnnovamente.appendChild(btnnovamentetext);
    center.appendChild(btnnovamente);
    dvnovamente.appendChild(center);
    document.body.appendChild(dvnovamente);

    document.addEventListener('keydown', function(event) {
        if(event.keyCode == 13)
            recarregarPagina();
    }, false);
}

function verificarLetra(letra,id) {
    var count = 0;

    for (i = 0; i < palavraSorteada.length; i++) {
        document.getElementById(id).disabled = true;
        if (palavraSorteada[i] == letra) {
            document.getElementById("letra" + i).value = letra;
            document.getElementById(id).className = "letracorreta";
            acertos++;
        }
        else {
            count++;
        }
    } 
    if (count == palavraSorteada.length)
        desenharForca(id);
    if (acertos == palavraSorteada.length)
        voceVenceu();
}

function desenharForca(id) {
    erros++;

    if(erros > 0 && erros < 7) {
        document.getElementById("boneco").src = "images/forca-"+erros+".jpg";
        document.getElementById(id).className = "letraerrada";
    }
    else {
        document.getElementById("boneco").src = "images/forca-"+erros+".jpg";
        document.getElementById(id).className = "letraerrada";
        vocePerdeu();
    }
}

function voceVenceu() {
    for (i = 0; i < letras.length; i++) {
        document.getElementById("tecla"+i).disabled = true;
    }
    document.getElementById("boneco").src = "images/forca-8.jpg";
    criarDvJogarNovamente();
}

function vocePerdeu() {
    for (i = 0; i < letras.length; i++) {
        document.getElementById("tecla"+i).disabled = true;
    }
    document.getElementById("dica").innerHTML = "Resposta: "+palavraSorteada.toUpperCase();
    criarDvJogarNovamente();
}

function recarregarPagina() {
    location.reload();
}