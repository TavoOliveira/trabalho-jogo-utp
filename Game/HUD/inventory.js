export default class Inventory {
	constructor() {
		this.itemSet = [
			/*{ keyID: "part-1", textureId: 3, type: 'ITEM', using: false, playerId: 1 },
			{ keyID: "part-2", textureId: 3, type: 'ITEM', using: false, playerId: 1 },
			{ keyID: "part-3", textureId: 3, type: 'ITEM', using: false, playerId: 1 },
            { keyID: "old-hat-H", textureId: 2, type: 'ARM', using: true, playerId: 1 },
            { keyID: "old-torso-T", textureId: 2, type: 'ARM', using: true, playerId: 1 },
            { keyID: "old-boots-B", textureId: 2, type: 'ARM', using: true, playerId: 1 },			
            { keyID: "old-colar-C", textureId: 2, type: 'ARM', using: true, playerId: 1 },*/			
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

		if (item) {
			if (using && item.type === 'ARM') {
				const typeChar = item.keyID[item.keyID.length - 1];
				for (const i of this.itemSet) {
					if (i.using && i.playerId === usingBy && i.type === 'ARM' && i.keyID.endsWith(typeChar)) {
						i.using = false; 
					}
				}
			}

			item.using = using;
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
		const items = this.itemSet.filter(item => item.using && item.type === 'ARM' && item.playerId === playerId);

		const slotOrder = ['H', 'T', 'B', 'C']; 
		items.sort((a, b) => {
			const aIndex = slotOrder.indexOf(a.keyID[a.keyID.length - 1]);
			const bIndex = slotOrder.indexOf(b.keyID[b.keyID.length - 1]);
			return aIndex - bIndex;
		});

		return items;
	}

    getSelectedItemData(idx, playerId) {
		const inventoryItems = this.getNotUsingItems();

		if (idx >= 0 && idx < 16) {
			return inventoryItems[idx] ?? null;
		}

		// Índices fixos para cada armadura
		const armorSlotMap = {
			16: 'H',
			17: 'T',
			18: 'B',
			19: 'C'
		};

		const typeChar = armorSlotMap[idx];
		if (typeChar) {
			return this.itemSet.find(item =>
				item.using &&
				item.type === 'ARM' &&
				item.playerId === playerId &&
				item.keyID.endsWith(typeChar)
			) ?? null;
		}

		return null;
	}

	CheckUniqueItensInset(itemName){
		return this.hasItem(itemName) && ['part-1','part-2','part-3'].includes(itemName)
	}

	//LOAD E SAVE
	serialize() {
		return {
			itemSet: this.itemSet.map(item => ({
				keyID: item.keyID,
				textureId: item.textureId,
				type: item.type,
				using: item.using,
				playerId: item.playerId
			}))
		};
	}

	static deserialize(data) {
		const inventory = new Inventory();
		inventory.itemSet = data.itemSet.map(item => ({
			keyID: item.keyID,
			textureId: item.textureId,
			type: item.type,
			using: item.using,
			playerId: item.playerId
		}));
		return inventory;
	}

}
