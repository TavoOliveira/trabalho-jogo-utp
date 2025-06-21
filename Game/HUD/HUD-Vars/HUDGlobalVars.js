const GlobalVars = {
    loading_offset:        (70 - 50) / 2,
    icon_offset:           (70 - 30) / 2,
    offset:                90,
    icon_vertical_spacing: 40,
    dpad_centerX:          document.documentElement.clientWidth * 0.1,
    dpad_centerY:          document.documentElement.clientHeight * 0.7,
    dpad2_centerX:         document.documentElement.clientWidth * 0.8,
    dpad2_offsetX:         60,
    potionX:               65,
    potionY:               (document.documentElement.clientHeight * 0.7) + 90 * 1.25,
    potionOffset:          (50 - 30) / 2,
    potionIconOffset:      (50 - 20) / 2,

    updateVars: function (newWidth, newHeight) {
        this.dpad_centerX          = newWidth * 0.1;
        this.dpad_centerY          = newHeight * 0.7;
        this.dpad2_centerX         = newWidth * 0.8;        

        this.potionY               = this.dpad_centerY + this.offset * 1.25;        
    }
};

export default GlobalVars;
