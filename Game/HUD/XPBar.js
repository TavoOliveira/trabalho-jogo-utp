// === / UTILIDADES / ===
import Texture from "../../Engine/Utils/texture.js";

// === / ENUMS GLOBAIS / === 
import Enums from "./HUD-enums/HUD_Enums.js";

export default class XPBar {
    constructor(position, LevelId, XP_Level) {
        this.position      = position;
        this.xptexture     = new Texture("/Game/Assets/HUD/XP_bar.png");

        this.levelId       = LevelId;
        this.xpnum         = XP_Level;
        this.levelexponent = 1.2;

        let xpNeeded = this.getXPNeededForLevel(this.levelId);
        let percent  = Math.floor((this.xpnum / xpNeeded) * 100);

        this.startX     = Enums.XP_BarLevel[this.getXPBarLevel(percent)];
        this.refCounter = this.getXPBarLevel(percent);
    }

    getXPBarLevel(xpPercent, totalStages = 5) {
        let step = 90 / totalStages;
        return Math.min(Math.floor(xpPercent / step), totalStages);
    }

    getXPNeededForLevel(levelId) {
        return 100.0 * Math.pow(levelId, this.levelexponent);
    }

    updateXPNum(_XP) {
        this.xpnum = _XP;

        let xpNeeded = this.getXPNeededForLevel(this.levelId);
        let percent  = Math.floor((this.xpnum / xpNeeded) * 100);

        if (this.xpnum >= xpNeeded) {
            this.xpnum = 0;
            this.levelId++;

            xpNeeded = this.getXPNeededForLevel(this.levelId);
            percent  = Math.floor((this.xpnum / xpNeeded) * 100);
        }

        this.startX     = Enums.XP_BarLevel[this.getXPBarLevel(percent)];
        this.refCounter = this.getXPBarLevel(percent);
    }

    IncCounter() {
        let xpNeeded = this.getXPNeededForLevel(this.levelId);
        let percent  = Math.floor((this.xpnum / xpNeeded) * 100);

        const newCounter = this.getXPBarLevel(percent);

        if (this.refCounter != newCounter) {
            this.startX     = Enums.XP_BarLevel[newCounter];
            this.refCounter = newCounter;
        }
    }

    draw(ctx) {
        this.IncCounter();

        this.xptexture.draw(ctx, this.position.x, this.position.y, 200, 40, this.startX, this.bartype, 18, 6);

        if(ctx != null){
            ctx.font = "2rem MONOGRAM";
            ctx.fillStyle = "white";
            ctx.textBaseline = "top";
            ctx.fillText(`Level ${this.levelId}`, this.position.x + 210, this.position.y + 2);

            let xpNeeded = this.getXPNeededForLevel(this.levelId);
            let percent  = Math.floor((this.xpnum / xpNeeded) * 100);

            ctx.font = "1.25rem MONOGRAM";
            ctx.fillText(`${percent}%`, this.position.x + 210, this.position.y + 30);
        }
    }
}