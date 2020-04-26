import StateBase from './state_base';
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
    // todo: move scalar value above into some constants
    const upwardMotion = new UpwardMotion(this.unit.moveController,
      this.internal.coordinateConverter, this.internal.movingTimerService, this.unit.transform, 50);

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
