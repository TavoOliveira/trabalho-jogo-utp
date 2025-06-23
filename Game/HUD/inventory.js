export default class Inventory {
	constructor() {
		this.itemSet = [
			{ keyID: "part-1", textureId: 3, type: 'ITEM', using: false, playerId: 1 },
			{ keyID: "part-2", textureId: 3, type: 'ITEM', using: false, playerId: 1 },
			{ keyID: "part-3", textureId: 3, type: 'ITEM', using: false, playerId: 1 },
            { keyID: "old-hat-H", textureId: 2, type: 'ARM', using: false, playerId: 0 },
            { keyID: "old-torso-T", textureId: 2, type: 'ARM', using: false, playerId: 0 },
            { keyID: "old-boots-B", textureId: 2, type: 'ARM', using: false, playerId: 0 },			
            { keyID: "old-colar-C", textureId: 2, type: 'ARM', using: false, playerId: 0 },			
		];
	}

	/**
	 * Adiciona ou remove um item do inventário.
	 * O campo 'type' é obrigatório ao adicionar.
	 * @param {object} item - Objeto com keyID, textureId, type, usando e playerId.
	 * @param {boolean} add - true para adicionar, false para remover.
	 */
	addOrRemoveItem(item, add = true) {        
		if (add) {
            if(this.getNotUsingItems.length + 1 == 16)
                return;
            
			if (typeof item !== 'object' || !item.keyID || !item.type) {
				console.warn(`Tentando adicionar item inválido:`, item);
				return;
			}

			const newItem = {
				keyID:     item.keyID,
				textureId: item.textureId ?? 0,
				type:      item.type,
				using:     item.using ?? false,
				playerId:  item.playerId ?? 0
			};

			this.itemSet.push(newItem);

		} else {			
			const keyID = item.keyID ?? item;
			this.itemSet = this.itemSet.filter(invItem => invItem.keyID !== keyID);
		}
	}

	/**
	 * Retorna um item específico por keyID.
	 * @param {string} itemId
	 * @returns {object|null}
	 */
	getItemById(itemId) {
		return this.itemSet.find(item => item.keyID === itemId) || null;
	}

	/**
	 * Define o estado "usando" (using) de um item específico.
	 * @param {string} itemId - ID do item.
	 * @param {boolean} using - true para marcar como em uso, false para desmarcar.
     * @param {number} usingBy -Id do player Utilizando.
	 */
	setUseItem(itemId, using, usingBy) {
		const item = this.getItemById(itemId);   
        
        if(this.getNotUsingItems.length + 1 == 16)
            return;
        
		if (item){ 
			item.using    = using;	
            item.playerId = usingBy;	
        }
	}

	/**
	 * Retorna todos os itens do inventário.
	 * @returns {object[]}
	 */
	getItems() {
		return [...this.itemSet];
	}

	/**
	 * Verifica se o inventário contém um item pelo keyID.
	 * @param {string} itemId
	 * @returns {boolean}
	 */
	hasItem(itemId) {
		return this.itemSet.some(item => item.keyID === itemId);
	}

	/**
	 * Retorna todos os itens de um tipo específico.
	 * @param {string} type
	 * @returns {object[]}
	 */
	getItemsByType(type) {
		return this.itemSet.filter(item => item.type === type);
	}

	/**
	 * Retorna todos os itens que estão com using = true.
	 * @returns {object[]}
	 */
	getNotUsingItems() {
		return this.itemSet.filter(item => !item.using);
	}
    
    getUsingArmorItems(playerId) {
        return this.itemSet.filter(item => item.using && item.type === 'ARM' && item.playerId === playerId);
    }

    getSelectedItemData(idx, playerId) {        
        const inventoryItems = this.getNotUsingItems();
        const armorItems    = this.getUsingArmorItems(playerId);                

        // Inventário (slots 0 a 15)
        if (idx >= 0 && idx < 16) {
            if (idx < inventoryItems.length) {
                return inventoryItems[idx];
            } else {
                return null;
            }
        }
        
        else if (idx >= 16 && idx <= 19) {
            const armorIndex = idx - 17;
            if (armorIndex < armorItems.length) {
                return armorItems[armorIndex];
            } else {
                return null;
            }
        }

        return null;
    }

}
