/**
 * Classe que representa um vetor 2D.
 */
export default class Vector2D {
    /**
     * Cria um novo vetor 2D.
     * @param {number} [x=0] - A coordenada x.
     * @param {number} [y=0] - A coordenada y.
     */
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    /**
     * Cria uma cópia do vetor atual.
     * @returns {Vector2D} Uma nova instância com os mesmos valores.
     */
    clone() {
        return new Vector2D(this.x, this.y);
    }

    /**
     * Copia os valores de outro vetor.
     * @param {Vector2D} vector - O vetor a ser copiado.
     * @returns {Vector2D} A própria instância atualizada.
     */
    copy(vector) {
        this.x = vector.x;
        this.y = vector.y;
        return this;
    }

    /**
     * Soma outro vetor a este.
     * @param {Vector2D} vector - O vetor a ser somado.
     * @returns {Vector2D} A própria instância atualizada.
     */
    add(vector) {
        this.x += vector.x;
        this.y += vector.y;
        return this;
    }

    /**
     * Subtrai outro vetor deste.
     * @param {Vector2D} vector - O vetor a ser subtraído.
     * @returns {Vector2D} A própria instância atualizada.
     */
    sub(vector) {
        this.x -= vector.x;
        this.y -= vector.y;
        return this;
    }

    /**
     * Multiplica o vetor por um escalar.
     * @param {number} scalar - O valor escalar.
     * @returns {Vector2D} A própria instância atualizada.
     */
    multiply(scalar) {
        this.x *= scalar;
        this.y *= scalar;
        return this;
    }

    /**
     * Divide o vetor por um escalar.
     * @param {number} scalar - O valor escalar.
     * @returns {Vector2D} A própria instância atualizada.
     */
    divide(scalar) {
        if (scalar !== 0) {
            this.x /= scalar;
            this.y /= scalar;
        }
        return this;
    }

    /**
     * Retorna o comprimento (magnitude) do vetor.
     * @returns {number} O comprimento do vetor.
     */
    length() {
        return Math.hypot(this.x, this.y);
    }

    /**
     * Normaliza o vetor (faz com que seu comprimento seja 1).
     * @returns {Vector2D} A própria instância normalizada.
     */
    normalize() {
        const len = this.length();
        return len > 0 ? this.divide(len) : this;
    }

    /**
     * Calcula o produto escalar com outro vetor. 
     * @param {Vector2D} vector - O outro vetor.
     * @returns {number} O produto escalar.
     */
    dot(vector) {
        return this.x * vector.x + this.y * vector.y;
    }

    /**
     * Calcula a distância até outro vetor.
     * @param {Vector2D} vector - O outro vetor.
     * @returns {number} A distância.
     */
    distanceTo(vector) {
        const dx = this.x - vector.x;
        const dy = this.y - vector.y;
        return Math.hypot(dx, dy);
    }

    /**
     * Define novos valores para x e y.
     * @param {number} x - Novo valor de x.
     * @param {number} y - Novo valor de y.
     * @returns {Vector2D} A própria instância atualizada.
     */
    set(x, y) {
        this.x = x;
        this.y = y;
        return this;
    }

    /**
     * Verifica se dois vetores são iguais.
     * @param {Vector2D} vector - O vetor a ser comparado.
     * @returns {boolean} Verdadeiro se os vetores forem iguais.
     */
    equals(vector) {
        return this.x === vector.x && this.y === vector.y;
    }

    /**
     * Soma dois vetores.
     * @param {Vector2D} a - O primeiro vetor.
     * @param {Vector2D} b - O segundo vetor.
     * @returns {Vector2D} Um novo vetor com a soma.
     */
    static add(a, b) {
        return new Vector2D(a.x + b.x, a.y + b.y);
    }

    /**
     * Subtrai dois vetores.
     * @param {Vector2D} a - O vetor minuendo.
     * @param {Vector2D} b - O vetor subtraendo.
     * @returns {Vector2D} Um novo vetor com a diferença.
     */
    static subtract(a, b) {
        return new Vector2D(a.x - b.x, a.y - b.y);
    }

    /**
     * Calcula a distância entre dois vetores.
     * @param {Vector2D} a - O primeiro vetor.
     * @param {Vector2D} b - O segundo vetor.
     * @returns {number} A distância.
     */
    static distance(a, b) {
        return a.distanceTo(b);
    }

    /**
     * Calcula o produto escalar entre dois vetores.
     * @param {Vector2D} a - O primeiro vetor.
     * @param {Vector2D} b - O segundo vetor.
     * @returns {number} O produto escalar.
     */
    static dot(a, b) {
        return a.dot(b);
    }

    /**
     * Retorna um vetor com valores (0, 0).
     * @returns {Vector2D} Um vetor nulo.
     */
    static zero() {
        return new Vector2D(0, 0);
    }
}
