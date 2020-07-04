import MoveController from '../../game_space/move_controller';
import Entity from '../entity';
import StateFactory from './states/state_factory';
import CoordinateConverter from '../../converters/coordinate_converter';
import TimerService from '../../game_space/timer_service';

/**
 * A base class for units
 * @typedef {import('../../transform').default} Transform
 * @typedef {import('../../animation/sprite_sheet').default} SpriteSheet
 * @typedef {import('../../game_space/move_enabler').default} MoveEnabler
 * @typedef {import('./states/state_base').default} StateBase
 * @typedef {import('../../player/input_event_type').default} InputEventType
 * @typedef {import('../../player/input_type').default} InputType
 * @typedef {import('../../player/input_state').default} InputState
 */
class UnitBase extends Entity {
  get transform() {
    return this.internal.transform;
  }

  /**
   * Gets sprite sheet of this unit
   */
  get spriteSheet() {
    return this.internal.spriteSheet;
  }

  get moveController() {
    return this.internal.moveController;
  }

  get currentState() {
    return this.internal.currentState;
  }

  set currentState(val) {
    this.internal.currentState = val;
    this.internal.currentState.stateCompleted.subscribe((state) => {
      this.currentState = state;
    });
  }

  /**
   * @param {Transform} transform
   * @param {SpriteSheet} spriteSheet
   * @param {MoveEnabler} moveEnabler
   */
  constructor(transform, spriteSheet, moveEnabler) {
    super(transform);
    /**
     * @private
     * @type {{
     * transform: Transform,
     * spriteSheet: SpriteSheet,
     * moveController: MoveController,
     * currentState: StateBase}}
     */
    this.internal = Object.assign({}, this.internal);

    this.internal.spriteSheet = spriteSheet;
    const movingTimerService = new TimerService();
    this.internal.moveController = new MoveController(this, moveEnabler, movingTimerService);

    // todo: move initialization of this variable above
    const coordinateConverter = new CoordinateConverter(1185, 254);

    const stateFactory = new StateFactory(this, movingTimerService, coordinateConverter);
    this.currentState = stateFactory.createInitialState();
  }

  /**
   * @param {InputEventType} inputEventType
   * @param {InputType} inputType
   * @param {InputState} inputState
   */
  handleInput(inputEventType, inputType, inputState) {
    const promise = this.internal.currentState.handleInput(inputEventType, inputType, inputState);

    if (promise) {
      promise.then((state) => {
        if (state) {
          this.currentState = state;
        }
      });
    }
  }
}

export default UnitBase;
