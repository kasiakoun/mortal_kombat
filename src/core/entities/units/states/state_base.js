import Observable from '../../../observable';

/**
 * @typedef {import('../unit_base').default} UnitBase
 * @typedef {import('./state_factory').default} StateFactory
 * @typedef {import('../../../player/input_event_type').default} InputEventType
 * @typedef {import('../../../player/input_type').default} InputType
 * @typedef {import('../../../player/input_state').default} InputState
 * @typedef {import('../../../game_space/timer_service').default} TimerService
 * @typedef {import('../../../converters/coordinate_converter').default} CoordinateConverter
 */
class StateBase {
  get stateCompleted() {
    return this.internal.stateCompleted;
  }

  /**
   * @param {StateFactory} stateFactory
   * @param {InputState} [lastInputState]
   */
  constructor(stateFactory, lastInputState) {
    /**
     * @type {{
     * stateFactory: StateFactory,
     * movingTimerService: TimerService,
     * coordinateConverter: CoordinateConverter,
     * lastInputState: InputState,
     * stateCompleted: Observable
     * }}
     */
    this.internal = {};

    this.unit = stateFactory.internal.unit;
    this.internal.movingTimerService = stateFactory.internal.movingTimerService;
    this.internal.coordinateConverter = stateFactory.internal.coordinateConverter;
    this.internal.stateFactory = stateFactory;
    this.internal.lastInputState = lastInputState;

    this.internal.stateCompleted = new Observable();
    this.promote();
  }

  promote() {
    throw new Error(`promote is not implemented in '${this.constructor.name}' class`);
  }

  /**
   * @param {InputEventType} inputEventType
   * @param {InputType} inputType
   * @param {InputState} inputState
   * @returns {Promise<StateBase>}
   */
  handleInput(inputEventType, inputType, inputState) {
    throw new Error(`handleInput is not implemented in '${this.constructor.name}' class`);
  }
}

export default StateBase;
