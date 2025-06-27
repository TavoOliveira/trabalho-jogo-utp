// === / UTILIDADES / ===
import { Collision,RectHitbox } from "../../Engine/Collision/index.js";
import Vector2D from "../../Engine/Utils/vector2d.js";
import Player from "../Entities/player.js";

export default class Combat {
	constructor(){
        this.currentplayersLevel = 1;
    }

	/**
	 * 
	 * @param {Player} player -Jogaddor realizando a ação
	 * @param {enemy} enemy   - Inimigo a ser Utilizado na verificação
	 * @param {deltaTime} deltaTime  - tempo delta 
	 */
	checkCollisions(player, enemy, deltaTime) {
		enemy.updatePlayerPosition(player.position);
		this.checkProjectileHits(player,enemy,deltaTime);

		const playerInView = Collision.check(player.hitbox, enemy.viewField);
		enemy.switchPlayerInFieldView(playerInView);

		if (!playerInView) {
			enemy.setAttack(false);
			return;
		}
		        
		enemy.setAttack(this.canEnemyAttack(player, enemy));
		
		if (this.isPlayerUsingHB(player) && Collision.check(player.hitbox, enemy.HBhitbox)) {
			enemy.subEnemyLife(player.position, deltaTime);
			this.checkEndCombat(player,enemy);
			return;
		}
		
		if (Collision.check(player.hitbox, enemy.playerattackbox) && this.isPlayerAttacking(player)) {
			enemy.subEnemyLife(player.position, deltaTime);
			this.checkEndCombat(player,enemy);
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

	checkProjectileHits(player, enemy, deltaTime) {
		if (player.projectiles.lenght == 0) return;

		for (let i = player.projectiles.length - 1; i >= 0; i--) {
			const projectile = player.projectiles[i];			
			const projectileHitbox = new RectHitbox(projectile, new Vector2D(0, 0), 6, 6);

			if (Collision.check(projectileHitbox, enemy.hitbox)) {
				player.projectiles.splice(i, 1); 
				enemy.subEnemyLife(player.position, deltaTime); 
				this.checkEndCombat(player, enemy); 
				break;
			}
		}
	}

	getRandomDrop() {
		const dropTable = [
			{ item: "old-colar-C", Texture: 2, type: 'ARM', chance: 0.6 },
			{ item: "old-boots-B", Texture: 2, type: 'ARM', chance: 0.7 },
			{ item: "old-hat-H", Texture: 2, type: 'ARM', chance: 0.5 },
			{ item: "old-torso-T", Texture: 2, type: 'AMR', chance: 0.8 },
			{ item: "part-1", Texture: 3, type: 'ITEM', chance: 0.8 },
			{ item: "part-2", Texture: 3, type: 'ITEM', chance: 0.5 },
			{ item: "part-3", Texture: 3, type: 'ITEM', chance: 0.2 },
		];
		
		const totalChance = dropTable.reduce((sum, item) => sum + item.chance, 0);

		const roll = Math.random();
		let cumulative = 0;

		for (const entry of dropTable) {
			cumulative += entry.chance / totalChance;
			if (roll <= cumulative) {
				return { keyID: entry.item, textureId: entry.Texture, type: entry.type };
			}
		}

		return null;
	}


	checkEndCombat(player,enemy){
		if (enemy.live <= 0 && !enemy.rewardGive) {		
			enemy.setRewardGive(true);						
			player.CheckXPLevel(4 * (enemy.level * 3));

			if(player.inventory.getNotUsingItems().length  < 15){
				const drop = this.getRandomDrop();		
				if (drop) {
					player.switchItemReceive(true); 
					player.inventory.addOrRemoveItem(drop);				
				}
			}

			return;
		}
	}

}
