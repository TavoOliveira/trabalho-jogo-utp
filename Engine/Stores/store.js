export default class Store {
    constructor(initialState = {}) {
      this.state = initialState;
      this.listeners = new Set();
    }
  
    getState() {
      return this.state;
    }
  
    setState(newState) {
      this.state = {
        ...this.state,
        ...newState,
      };
      this.notify();
    }
  
    subscribe(listener) {
      this.listeners.add(listener);
      listener(this.state);
      return () => this.listeners.delete(listener);
    }
  
    notify() {
      this.listeners.forEach((listener) => listener(this.state));
    }
  }
  