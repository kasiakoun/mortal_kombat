import Animations from '../../../animation/animations';
import StateBase from './state_base';
import InputEventType from '../../../player/input_event_type';

/**
 * @typedef {import('../unit_base').default} UnitBase
 * @typedef {import('../../../player/input_state').default} InputState
 * @typedef {import('../../../player/input_type').default} InputType
 */
class StanceState extends StateBase {
  promote() {
    this.unit.spriteSheet.playForwardAnimation(Animations.stance);
    this.unit.moveController.stop();
  }

  /**
   * @param {InputEventType} inputEventType
   * @param {InputType} inputType
   * @param {InputState} inputState
   * @returns {StateBase}
   */
  handleInput(inputEventType, inputType, inputState) {
    let newState;
    if (inputEventType === InputEventType.down || inputEventType === InputEventType.press) {
      newState = this.internal.stateFactory.createState(inputState);
    }

    return newState;
  }
}

export default StanceState;
