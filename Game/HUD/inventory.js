export default class Inventory {
	constructor() {
		this.itemSet = [];
	}

	/**
	 * Adiciona ou remove um item do inventário.
	 * @param {any} itemId - ID ou nome do item.
	 * @param {boolean} add - true para adicionar, false para remover.
	 */
	addOrRemoveItem(itemId, add = true) {
		if (add) {
			this.itemSet.push(itemId);
		} else {
			const index = this.itemSet.indexOf(itemId);
			if (index !== -1) {
				this.itemSet.splice(index, 1);
			}
		}
	}

	/**
	 * Retorna todos os itens do inventário.
	 */
	getItems() {
		return [...this.itemSet];
	}

	/**
	 * Verifica se o inventário contém um item.
	 * @param {any} itemId
	 */
	hasItem(itemId) {
		return this.itemSet.includes(itemId);
	}
}
