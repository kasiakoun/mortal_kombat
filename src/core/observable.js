/**
 * Notifies observers about the changes his state
 */
export default class Observable {
  constructor() {
    /**
     * @private
     */
    this.internal.observers = [];
  }

  /**
   * Adds a function to the observers
   * @param {Function} func
   */
  subscribe(func) {
    if (typeof func !== 'function') {
      return;
    }

    this.internal.observers.push(func);
  }

  /**
   * Removes a function from the observers
   * @param {Function} func
   */
  unsubscribe(func) {
    if (typeof func !== 'function') {
      return;
    }

    const foundIndex = this.observers.indexOf(func);
    if (foundIndex < 0) {
      return;
    }

    this.internal.observers.splice(foundIndex, 1);
  }

  /**
   * Calls all the functions that is contained in the observers
   * @param {...*} parameters
   */
  fire(...parameters) {
    (async () => {
      this.internal.observers.forEach(func => func(...parameters));
    })();
  }
}
