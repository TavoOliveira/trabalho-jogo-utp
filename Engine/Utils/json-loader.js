export default class JsonLoader {
    static async load(path) {
        try {
            const response = await fetch(path);

            if (!response.ok) {
                throw new Error(`Erro ao carregar JSON (${response.status}): ${path}`);
            }

            return await response.json();
        } catch (error) {
            console.error(`[JsonLoader] Falha ao carregar '${path}':`, error);
            throw error; // Propaga para quem chamou
        }
    }
}