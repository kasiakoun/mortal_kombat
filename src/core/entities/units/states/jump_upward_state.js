import StateBase from './state_base';
import CoordinateConverter from '../../../converters/coordinate_converter';
import TimerService from '../../../game_space/timer_service';
import UpwardMotion from '../../../game_space/motions/upward_motion';
import UpwardUnitAction from '../actions/upward_unit_action';

/**
 * @typedef {import('../unit_base').default} UnitBase
 * @typedef {import('../../../player/input_state').default} InputState
 * @typedef {import('../../../player/input_event_type').default} InputEventType
 * @typedef {import('../../../player/input_type').default} InputType
 */
class JumpUpwardState extends StateBase {
  promote() {
    const coordinateConverter = new CoordinateConverter(1185, 254);
    // todo: move TimeService to separated method to this method can be transfered to MoveController
    const timeService = new TimerService();

    const upwardMotion = new UpwardMotion(this.unit.moveController,
      coordinateConverter, timeService, this.unit.transform, 50);

    const upwardUnitAction = new UpwardUnitAction(this.unit.spriteSheet, upwardMotion);
    upwardUnitAction.execute().then(() => this.promoted());
  }

  /**
   * @param {InputEventType} inputEventType
   * @param {InputType} inputType
   * @param {InputState} inputState
   * @returns {StateBase}
   */
  handleInput(inputEventType, inputType, inputState) {
  }

  promoted() {
    const newState = this.internal.stateFactory.createState(this.internal.lastInputState);

    this.stateCompleted.fire(newState);
    this.stateCompleted.clear();
  }
}

export default JumpUpwardState;
