import Animator from "./animator.js";

export default class AnimatorManager {
    constructor() {
        /** @type {Map<string, Animator>} */
        this.animators = new Map();
    }

    /**
     * Adiciona uma nova animação
     * @param {Animator} animator
     */
    add(animator) {
        if (!(animator instanceof Animator)) {
            throw new Error("Apenas instancias de Animator podem ser adicionados");
        }

        this.animators.set(animator.name, animator);
    }

    /**
     * Remove a animação
     * @param {string} name
     */
    remove(name) {
        this.animators.delete(name);
    }

    /**
     * Obter animação pelo nome
     * @param {string} name
     * @returns {Animator | undefined}
     */
    get(name) {
        return this.animators.get(name);
    }

    updateAll(deltaTime) {
        for (const animator of this.animators.values()) {
            animator.update(deltaTime);
        }
    }
}