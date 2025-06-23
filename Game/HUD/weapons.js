export default class Weapons{
    /**
     * @param {Number} WeaponId -numero da arma     
     */
    constructor(WeaponId){
        this.WeaponId = WeaponId;
    }

    nextWeapon(){        
        if(this.WeaponId + 1 == 3)
            this.WeaponId = 1;
        else 
            this.WeaponId++;                        
    }
}