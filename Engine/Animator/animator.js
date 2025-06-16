import Texture from "../Utils/texture.js";

export default class Animator {
    #currentFrame;
    #elapsedTime;
    #frameDuration;

    /**
    * @type {Map<string, Hitbox[]>}
    */
    #hitboxes;

    /**
    * @type {Map<string, Hitbox[]>}
    */
    #globalHitboxes;

    /**
     * Cria uma nova animação.
     * @param {string} name - O nome da animação.
     * @param {Texture} texture - A textura contendo os quadros da animação.
     * @param {number} width - A largura de cada quadro na animação.
     * @param {number} height - A altura de cada quadro na animação.
     * @param {number} startX - A coordenada x do primeiro quadro na textura.
     * @param {number} startY - A coordenada y do primeiro quadro na textura.
     * @param {number} count - O número de quadros na animação.
     * @param {number} fps - Os quadros por segundo da animação.
     */
    constructor(name, texture, width, height, startX, startY, count, fps) {
        this.name = name;
        this.texture = texture;
        this.width = width;
        this.height = height;
        this.startX = startX;
        this.startY = startY;
        this.count = count;

        this.isPlaying = false;

        this.#currentFrame = 0;
        this.#elapsedTime = 0;
        this.#frameDuration = 1000 / fps;

        this.#hitboxes = new Map();
        this.#globalHitboxes = [];
    }

    setHitboxes(frameIndex, hitboxes) {
        this.#hitboxes.set(frameIndex, hitboxes);
    }

    setGlobalHitboxes(hitboxes) {
        this.#globalHitboxes = hitboxes;
    }

    getCurrentHitboxes() {
        const frameHitboxes = this.#hitboxes.get(this.#currentFrame) || [];
        return [...this.#globalHitboxes, ...frameHitboxes];
    }

    getCurrentFrameIndex() {
        return this.#currentFrame;
    }

    play() {
        this.isPlaying = true;
    }

    stop() {
        this.isPlaying = false;
        this.#currentFrame = 0;
        this.#elapsedTime = 0;
    }

    update(deltaTime) {
        if (!this.isPlaying) return;

        this.#elapsedTime += deltaTime;
        if (this.#elapsedTime >= this.#frameDuration) {
            this.#currentFrame = (this.#currentFrame + 1) % this.count;
            this.#elapsedTime -= this.#frameDuration;
        }
    }

    draw(ctx, position) {
        if (!this.isPlaying) return;

        const sx = this.startX + this.#currentFrame * this.width;
        const sy = this.startY;

        this.texture.draw(ctx, position.x, position.y, this.width, this.height, sx, sy, this.width, this.height);
    }
}