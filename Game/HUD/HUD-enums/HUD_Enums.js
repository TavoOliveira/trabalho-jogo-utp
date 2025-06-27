const bar_type = {
    1: 21, //tipo - 1 - azul
    2: 37, //tipo - 2 - verde
    3: 69, //tipo - 3 - Laranja
    4: 85  //tipo - 4 - roxo
};

const XP_BarLevel = {
    0: 175, //vazia
    1: 143, //1 nivel - 1 ponto
    2: 111, //2 nivel - 2 ponto
    3: 79,  //3 nivel - 3 ponto
    4: 47,  //5 nivel - 4 ponto
    5: 15   //6 nivel - completo
}

const UtilityIcon_type = {
    1: {x: 0,   y: 80}, //tipo - 1 - azul
    2: {x: 0,   y: 0},  //tipo - 2 - verde
    3: {x: 128, y: 0},  //tipo - 3 - Laranja
    4: {x: 128, y: 80}, //tipo - 4 - roxo

    'm-1': {x: 64,  y: 80}, //minimapa tipo - 1 - azul
    'm-2': {x: 64,  y: 0},  //minimapa tipo - 2 - verde
    'm-3': {x: 192, y: 0},  //minimapa tipo - 3 - Laranja
    'm-4': {x: 192, y: 80}  //minimapa tipo - 4 - roxo

};

const Key_type = {
    //GERAIS
    'a': {x:1  ,y:33 ,sW: 14,sH: 13},    
    's': {x:17 ,y:33 ,sW: 14,sH: 13},
    'd': {x:33 ,y:33 ,sW: 14,sH: 13},
    'w': {x:17 ,y:17 ,sW: 14,sH: 13},
    'q': {x:1  ,y:17 ,sW: 14,sH: 13},
    'e': {x:33 ,y:17 ,sW: 14,sH: 13},
    'r': {x:49 ,y:17 ,sW: 14,sH: 13},
    'z': {x:81 ,y:17 ,sW: 14,sH: 13},
    'x': {x:17 ,y:49 ,sW: 14,sH: 13},
    'v': {x:49 ,y:49 ,sW: 14,sH: 13},

    //ESPECIFICOS
    'alt': {x:17 ,y:65 ,sW: 14,sH: 13},  
    'esc': {x:97 ,y:65 ,sW: 14,sH: 13},    

    //D-PAD
    'up':    {x:113 ,y:65 ,sW: 14,sH: 13}, 
    'down':  {x:113 ,y:81 ,sW: 14,sH: 13}, 
    'left':  {x:97 ,y:81 ,sW: 14,sH: 13}, 
    'right': {x:129 ,y:81 ,sW: 14,sH: 13}
};

/*
Regras pra padronização:
habilidade: playerID + - + teclas referente (se for mouse usa lclk por exemplo)
Armas: playerID + -wp- + numeração progressiva de 1 em diante
Armaduras: playerID + -arm- + numeração chave

itens: (nome chave)
*/
const icons = {
    //HABILIDADES
    '1-q': {x: 352,y: 1504,sW: 32,sH: 32}, //Bomba        - player 1
    '1-z': {x: 416,y: 1440,sW: 32,sH: 32}, //Habilidade 1 - player 1
    '1-x': {x: 224,y: 1696,sW: 32,sH: 32}, //Habilidade 2 - player 1

    '2-q': {x: 256,y: 2208,sW: 32,sH: 32}, //Dash         - player 2
    '2-z': {x: 32,y: 2624,sW: 32,sH: 32},  //Habilidade 1 - player 2
    '2-x': {x: 384,y: 2112,sW: 32,sH: 32}, //Habilidade 2 - player 2
    
    '4-q': {x: 416,y: 1760,sW: 32,sH: 32}, //Dash         - player 4
    '4-z': {x: 96,y: 1472,sW: 32,sH: 32},  //Habilidade 1 - player 4
    '4-x': {x: 224,y: 1536,sW: 32,sH: 32}, //Habilidade 2 - player 4

    //ITEMS
    'hpt': {x: 448,y: 1887,sW: 32,sH: 32}, //Poção de cura

    //ARMADURAS    
    'old-hat-H':   {x: 64,y: 3808,sW: 32,sH: 32},  //capacete velho 
    'old-torso-T': {x: 64,y: 3840,sW: 32,sH: 32},  //Torso velho 
    'old-boots-B': {x: 64,y: 3872,sW: 32,sH: 32},  //Botas velhas 
    'old-colar-C': {x: 352,y: 3679,sW: 32,sH: 32}, //colar velho 

    //ARMAS
    '1-wp-1': {x: 160,y: 3328,sW: 32,sH: 32}, //Espada - player 1
    '1-wp-2': {x: 288,y: 3328,sW: 32,sH: 32}, //Arco   - player 1

    '2-wp-1': {x: 448,y: 3488,sW: 32,sH: 32}, //Espada - player 2
    '2-wp-2': {x: 64,y: 3392,sW: 32,sH: 32},  //Arco   - player 2

    '4-wp-1': {x: 96,y: 3360,sW: 32,sH: 32},  //Espada - player 4
    '4-wp-2': {x: 417,y: 3584,sW: 32,sH: 32}, //Arco   - player 4    

    //UTILIDADES
    'x': {x: 479,y: 1279,sW: 32,sH: 32},    //X
    'switch': {x: 415,y: 0,sW: 32,sH: 32},  //Jogadores
    'map-icon': {x: 128,y: 0,sW: 32,sH: 32} //Jogador no minimapa
};

const menus_positions = {
    'menu-1': {x: 128,y: 131,sW: 64,sH: 76},   //Menu 1
    'slotMenu-1': {x: 136,y: 3,sW: 96,sH: 60}, //Menu 1 - slots

    'mn-btn-style-0': {x: 70,y: 234,sW: 52,sH: 15}, //Botão de start/play - não clicado
    'mn-btn-style-1': {x: 6,y: 234,sW: 52,sH: 15},  //Botão de start/play - clicado

    'icon-select-0': {x: 198,y: 132,sW: 24,sH: 25}, //Icon para o inventario
    'icon-select-1': {x: 198,y: 196,sW: 24,sH: 25}, //Icon para o inventario
}

const inventPositions = {
    'slots-1':    {x: 252,y: 0,sW: 75,sH: 75},  //slots - cinza
    'slot-1':     {x: 224,y: 79,sW: 24,sH: 24}, //1 slot - cinza
    'slotPack-1': {x: 224,y: 0,sW: 24,sH: 75},  //4 slot - cinza

    'slots-2': {x: 476,y: 0,sW: 75,sH: 75}, //slots - branco
    'slots-3': {x: 364,y: 0,sW: 75,sH: 75}, //slots - marrom
    'slots-4': {x: 140,y: 0,sW: 75,sH: 75}, //slots - marrom
}

const customIcons = {
    1: {x: 28,y: 4,sW: 15,sH: 12},
    2: {x: 0,y: 0,sW: 27,sH: 21},
    3: {x: 0,y: 0,sW: 0,sH: 0},
    4: {x: 48,y: 4,sW: 13,sH: 12},

    'bd-1': {x: 31,y: 38,sW: 15,sH: 18},
    'bd-2': {x: 0,y: 26,sW: 30,sH: 31},
    'bd-3': {x: 0,y: 0,sW: 0,sH: 0},
    'bd-4': {x: 47,y: 24,sW: 28,sH: 33},
    
    'null-H': {x: 38,y: 70,sW: 20,sH: 24 }, //Armadura Nula - cabeça
    'null-T': {x: 98,y: 70,sW: 28,sH: 24},  //Armadura Nula - torso
    'null-B': {x: 67,y: 69,sW: 26,sH: 26},  //Armadura Nula - botas
    'null-C': {x: 3,y: 68,sW: 24,sH: 24},   //Armadura Nula - colar  
    
    'part-1': {x: 67,y: 4,sW: 27,sH: 12},  //parte 1 do avião
    'part-2': {x: 95,y: 1,sW: 33,sH: 15},  //parte 2 do avião
    'part-3': {x: 131,y: 0,sW: 28,sH: 21}, //parte 3 do avião

    'pointer-1': {x:  0,y: 112,sW: 16,sH: 16}, //pointer - vermelho
    'pointer-2': {x: 16,y: 112,sW: 16,sH: 16}, //pointer - branco
    'pointer-3': {x: 32,y: 112,sW: 16,sH: 16}, //pointer - preto
}

const dots_Id = { 
    0: "/Game/Assets/HUD/mouseIcons/white_dots.png",
    1: "/Game/Assets/HUD/mouseIcons/blue_dots.png", 
    2: "/Game/Assets/HUD/mouseIcons/green_dots.png",
    3: "/Game/Assets/HUD/mouseIcons/orange_dots.png",
    4: "/Game/Assets/HUD/mouseIcons/purple_dots.png",                           
}

//Modelo:
//nome \n\n breve texto\n raridade \n 
const descriptions = {
    'not': "este item nao pode ser removido",
    'part-1': "Parte de aviao quebrada\n\nParte frontal do aviao quebrada no acidente...\nRaridade: Comum\nUso - Item de historia\n(NAO PODE SER DESCARTADO)",
    'part-2': "Parte de aviao quebrada\n\nParte medial do aviao quebrada no acidente...\nRaridade: Comum\nUso - Item de historia\n(NAO PODE SER DESCARTADO)",
    'part-3': "Parte de aviao quebrada\n\nParte traseira do aviao quebrada no acidente...\nRaridade: Comum\nUso - Item de historia\n(NAO PODE SER DESCARTADO)",
    'old-hat-H':"Capacete velho",
}

const sprites_offset = {
    'p-1': 50,
    'p-2': 31,
    'p-3': 0,
    'p-4': 40,
    'e-1': 50,
    'e-2': 50,
    'e-3': 32,
    'e-4': 90,
}

export default {UtilityIcon_type,bar_type,Key_type,dots_Id,XP_BarLevel,icons,customIcons,menus_positions,inventPositions,descriptions,sprites_offset};
