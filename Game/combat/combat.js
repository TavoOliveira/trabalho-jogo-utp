// === / UTILIDADES / ===
import { Collision } from "../../Engine/Collision/index.js";

export default class combat {
	constructor() {                        
    }

    checkCollisions(_player,_enemy,currentDeltaTime){
        _enemy.updatePlayerPosition(_player.position);   
        
        const insideFieldView = Collision.check(_player.hitbox, _enemy.viewField);

        _enemy.switchPlayerInFieldView(insideFieldView);

        if(insideFieldView){
            if(Collision.check(_player.hitbox, _enemy.HBhitbox) && this.checkPlayerHB(_player))
                _enemy.subEnemyLife(_player.position,currentDeltaTime);
            else if(Collision.check(_player.hitbox, _enemy.attackbox)){
                _enemy.setAttack(true);                                                       

                if(this.checkPlayerAttack(_player))
                    _enemy.subEnemyLife(_player.position,currentDeltaTime);

                if (Collision.check(_player.hitbox, _enemy.hitbox) && _enemy.live > 0) {                
                    _player.subPlayerLife(_enemy.position,currentDeltaTime);
                }
            } else{
                _enemy.setAttack(false);
            }   
        }
    }    

    checkPlayerAttack(_player){    
        return (['attack_1','attack_2'].includes(_player.currentAnim.name));
    }

    checkPlayerHB(_player){
        switch(_player.PlayerId){
            case 1:
                if(['HB_01'].includes(_player.currentAnim.name))
                    return true;
                break
            case 2:
                if(['HB_02','HB_03'].includes(_player.currentAnim.name))
                    return true;
                break
            case 3:
                return false;
                break;
            case 4:
                if(['HB_02'].includes(_player.currentAnim.name))
                    return true;
                break
            default:
                return false;
        }        
    }
}