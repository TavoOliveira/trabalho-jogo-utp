// === / UTILIDADES / ===
import { Collision } from "../../Engine/Collision/index.js";

export default class Combat {
	constructor(){
        this.currentplayersLevel = 1;
    }

	checkCollisions(player, enemy, deltaTime) {
		enemy.updatePlayerPosition(player.position);

		const playerInView = Collision.check(player.hitbox, enemy.viewField);
		enemy.switchPlayerInFieldView(playerInView);

		if (!playerInView) {
			enemy.setAttack(false);
			return;
		}
		        
		enemy.setAttack(this.canEnemyAttack(player, enemy));
		
		if (this.isPlayerUsingHB(player) && Collision.check(player.hitbox, enemy.HBhitbox)) {
			enemy.subEnemyLife(player.position, deltaTime);
			return;
		}
		
		if (Collision.check(player.hitbox, enemy.playerattackbox) && this.isPlayerAttacking(player)) {
			enemy.subEnemyLife(player.position, deltaTime);
		}
		
		if (Collision.check(player.hitbox, enemy.hitbox) && enemy.live > 0 && !this.isPlayerUsingHB(player)) {
			player.subPlayerLife(enemy.position, deltaTime);
		}
	}
	
	canEnemyAttack(player, enemy) {
		return (
			Collision.check(player.hitbox, enemy.enemyattackbox) &&
			this.isEnemyAbleToMove(enemy)
		);
	}

	isEnemyAbleToMove(enemy) {
		return ['idle', 'walk'].includes(enemy.currentAnim.name);
	}

	isPlayerAttacking(player) {
		return ['attack_1', 'attack_2'].includes(player.currentAnim.name);
	}

	isPlayerUsingHB(player) {
		switch (player.PlayerId) {
			case 1:
				return ['HB_01'].includes(player.currentAnim.name);
			case 2:
				return ['HB_02', 'HB_03'].includes(player.currentAnim.name);
			case 4:
				return ['HB_02'].includes(player.currentAnim.name);
			default:
				return false;
		}
	}
}
