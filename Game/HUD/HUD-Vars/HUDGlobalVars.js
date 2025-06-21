const loading_offset        = (70 - 50) / 2;                               //Ajuste - centralizar Loading
const icon_offset           = (70 - 30) / 2;                               //Ajuste - centralizar Loading
const offset                = 90;                                          // Ajuste - Distância entre o centro e cada botão
const icon_vertical_spacing = 40;                                          // Espaço extra acima do botão
const dpad_centerX          = document.documentElement.clientWidth * 0.1;  // Ajuste - centralizar na horizontal
const dpad_centerY          = document.documentElement.clientHeight * 0.7; // Ajuste - Altura

// Para o novo layout
const dpad2_centerX = document.documentElement.clientWidth * 0.8;

const dpad2_offsetX = 60;  // Distância horizontal entre Center, Left e Right


const potionX          = 65;
const potionY          = dpad_centerY + offset * 1.25;
const potionOffset     = (50 - 30) / 2;
const potionIconOffset = (50 - 20) / 2;

export default {
    dpad_centerX,
    dpad_centerY,
    offset,
    loading_offset,
    icon_vertical_spacing,
    icon_offset,
    potionX,
    potionY,
    potionOffset,
    potionIconOffset,
    dpad2_centerX,    
    dpad2_offsetX
}