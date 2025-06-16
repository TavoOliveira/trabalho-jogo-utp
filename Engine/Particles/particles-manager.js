export default class ParticlesManager {
    constructor() {
        /**
         * @type {Particles[]}
         */
        this.particles = [];
    }

    add(position, count = 10) {
        for (let i = 0; i < count; i++) {
            this.particles.push(new Particles(position));
        }
    }

    update() {
        this.particles = this.particles.filter(p => p.isLife());
        this.particles.forEach(p => p.update());
    }

    draw(ctx) {
        this.particles.forEach(p => p.draw(ctx));
    }
}