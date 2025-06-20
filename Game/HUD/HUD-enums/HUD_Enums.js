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
    4: {x: 128, y: 80}  //tipo - 4 - roxo
};

const Key_type = {
    'q': {x:1  ,y:17 ,sW: 14,sH: 13},
    'e': {x:33 ,y:17 ,sW: 14,sH: 13},
    'z': {x:81 ,y:17 ,sW: 14,sH: 13},
    'x': {x:17 ,y:49 ,sW: 14,sH: 13},
    'v': {x:49 ,y:49 ,sW: 14,sH: 13}    
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
    '2-x': {x: 320,y: 2208,sW: 32,sH: 32}, //Habilidade 2 - player 2
    
    '4-q': {x: 416,y: 1760,sW: 32,sH: 32}, //Dash         - player 4
    '4-z': {x: 96,y: 1472,sW: 32,sH: 32},  //Habilidade 1 - player 4
    '4-x': {x: 480,y: 2080,sW: 32,sH: 32}, //Habilidade 2 - player 4

    //ITEMS
    'hpt': {x: 448,y: 1887,sW: 32,sH: 32}, //Poção de cura

    //ARMADURAS

    //ARMAS
    '1-wp-1': {x: 160,y: 3328,sW: 32,sH: 32}, //Espada - player 1
    '1-wp-2': {x: 288,y: 3328,sW: 32,sH: 32}, //Arco   - player 1

    '2-wp-1': {x: 448,y: 3488,sW: 32,sH: 32}, //Espada - player 2
    '2-wp-2': {x: 64,y: 3392,sW: 32,sH: 32},  //Arco   - player 2

    '4-wp-1': {x: 96,y: 3360,sW: 32,sH: 32},  //Espada - player 4
    '4-wp-2': {x: 417,y: 3584,sW: 32,sH: 32},  //Arco   - player 4    

    //UTILIDADES
    'x' : {x: 479,y: 1279,sW: 32,sH: 32} //X
};

const playerIcon = {
    1: {x: 28,y: 4,sW: 15,sH: 12},
    2: {x: 0,y: 0,sW: 27,sH: 21},
    3: {x: 0,y: 0,sW: 0,sH: 0},
    4: {x: 48,y: 4,sW: 13,sH: 12},
}

const dots_Id = { 
    0: "/Game/Assets/HUD/mouseIcons/white_dots.png",
    1: "/Game/Assets/HUD/mouseIcons/blue_dots.png", 
    2: "/Game/Assets/HUD/mouseIcons/green_dots.png",
    3: "/Game/Assets/HUD/mouseIcons/orange_dots.png",
    4: "/Game/Assets/HUD/mouseIcons/purple_dots.png",                           
}

export default {UtilityIcon_type,bar_type,Key_type,dots_Id,XP_BarLevel,icons,playerIcon};
