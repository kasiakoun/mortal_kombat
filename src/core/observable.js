export default class Observable {
  constructor() {
    this.observers = [];
  }

  subscribe(func) {
    if (typeof func !== 'function') return;

    this.observers.push(func);
  }

  unsubscribe(func) {
    if (typeof func !== 'function') return;

    const foundIndex = this.observers.indexOf(func);
    if (foundIndex < 0) return;

    this.observers.splice(foundIndex, 1);
  }

  fire(paramter) {
    (async () => {
      this.observers.forEach(func => func(paramter));
    })();
  }
}
