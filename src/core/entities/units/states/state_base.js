import Observable from '../../../observable';

/**
 * @typedef {import('../unit_base').default} UnitBase
 * @typedef {import('./state_factory').default} StateFactory
 * @typedef {import('../../../player/input_event_type').default} InputEventType
 * @typedef {import('../../../player/input_type').default} InputType
 * @typedef {import('../../../player/input_state').default} InputState
 */
class StateBase {
  get stateCompleted() {
    return this.internal.stateCompleted;
  }

  /**
   * @param {UnitBase} unit
   * @param {StateFactory} stateFactory
   * @param {InputState} [lastInputState]
   */
  constructor(unit, stateFactory, lastInputState) {
    /**
     * @type {{
     * stateFactory: StateFactory,
     * lastInputState: InputState,
     * stateCompleted: Observable
     * }}
     */
    this.internal = {};

    this.unit = unit;
    this.internal.stateFactory = stateFactory;
    this.internal.lastInputState = lastInputState;

    this.internal.stateCompleted = new Observable();
    this.promote();
  }

  promote() {
    throw new Error(`promote is not implemented in '${this.constructor.name}' class`);
  }
}

export default StateBase;
