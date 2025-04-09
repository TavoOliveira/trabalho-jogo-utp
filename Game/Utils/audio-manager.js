export default class AudioManager {
    constructor() {
        this.sounds = new Map();
    }

    load(name, src) {
        const audio = new Audio(src);
        audio.preload = 'auto';
        this.sounds.set(name, audio);
    }

    /**
     * Toca o som (cria uma nova instância se quiser sobreposição)
     * @param {String} name 
     * @param {Boolean} loop 
     * @param {Boolean} allowOverlap - se true = múltiplas instâncias do mesmo som serão tocadas
     */
    play(name, loop = false, allowOverlap = false) {
        const sound = this.sounds.get(name);
        
        if (!sound) return;

        if (allowOverlap) {
            const clone = sound.cloneNode();
            clone.loop = loop;
            clone.play();
        } else {
            if (sound.paused) {
                sound.loop = loop;
                sound.currentTime = 0;
                sound.play();
            }
        }
    }

    pause(name) {
        const sound = this.sounds.get(name);
        if (sound && !sound.paused) sound.pause();
    }

    stop(name) {
        const sound = this.sounds.get(name);
        if (sound) {
            sound.pause();
            sound.currentTime = 0;
        }
    }

    setVolume(name, volume) {
        const sound = this.sounds.get(name);
        if (sound) sound.volume = volume;
    }

    isPlaying(name) {
        const sound = this.sounds.get(name);
        return sound && !sound.paused;
    }

    unload(name) {
        this.sounds.delete(name);
    }

    stopAll() {
        for (const sound of this.sounds.values()) {
            sound.pause();
            sound.currentTime = 0;
        }
    }
}