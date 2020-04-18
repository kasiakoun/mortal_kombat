import Animations from '../../../animation/animations';
import StateBase from './state_base';
import StanceState from './stance_state';
import InputEventType from '../../../player/input_event_type';
import InputType from '../../../player/input_type';
import WalkForwardState from './walk_forward_state';
import WalkBackwardState from './walk_backward_state';

import CoordinateConverter from '../../../converters/coordinate_converter';
import TimerService from '../../../game_space/timer_service';
import UpwardMotion from '../../../game_space/motions/upward_motion';
import UpwardUnitAction from '../actions/upward_unit_action';

/**
 * @typedef {import('../unit_base').default} UnitBase
 * @typedef {import('../../../player/input_state').default} InputState
 */
class JumpUpwardState extends StateBase {
  promote() {
    const coordinateConverter = new CoordinateConverter(1185, 254);
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
    super.handleInput(inputEventType, inputType, inputState);
    let newState;

    return newState;
  }

  promoted() {
    let newState;

    // todo: this part of code needs to be moved into factories
    if (this.internal.lastInputState.upward) {
      newState = new JumpUpwardState(this.unit, this.internal.lastInputState);
    } else if (this.internal.lastInputState.forward) {
      newState = new WalkForwardState(this.unit, this.internal.lastInputState);
    } else if (this.internal.lastInputState.backward) {
      newState = new WalkBackwardState(this.unit, this.internal.lastInputState);
    } else {
      newState = new StanceState(this.unit, this.internal.lastInputState);
    }

    this.stateCompleted.fire(newState);
    this.stateCompleted.clear();
  }
}

export default JumpUpwardState;
