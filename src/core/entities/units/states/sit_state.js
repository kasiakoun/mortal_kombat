import StateBase from './state_base';
import Animations from '../../../animation/animations';
import InputType from '../../../player/input_type';
import InputEventType from '../../../player/input_event_type';
import Point from '../../../point';

/**
 * @typedef {import('../../../animation/animation').default} Animation
 * @typedef {import('../../../animation/frame').default} Frame
 */
class SitState extends StateBase {
  promote() {
    this.unit.moveController.stop();
    this.unit.spriteSheet.playForwardAnimation(Animations.sit);

    this.lastFixedPosition = this.unit.transform.position;
    this.changePositionByFrameWithContext = this.changePositionByFrame.bind(this);
    this.unit.spriteSheet.animationFrameChanged.subscribe(this.changePositionByFrameWithContext);
  }

  /**
   * @param {Animation} animation
   * @param {Frame} frame
   */
  changePositionByFrame(animation, frame) {
    if (animation.name === Animations.sit) {
      const offsetY = this.unit.transform.height - frame.height;
      const currentPositionY = this.lastFixedPosition.y + offsetY;
      this.unit.transform.position = new Point(this.unit.transform.position.x, currentPositionY);
    }
  }

  /**
   * @param {InputEventType} inputEventType
   * @param {InputType} inputType
   * @param {InputState} inputState
   * @returns {Promise<StateBase>}
   */
  handleInput(inputEventType, inputType, inputState) {
    if (inputType === InputType.downward && inputEventType === InputEventType.up) {
      return this.unit.spriteSheet.playBackwardAnimation(Animations.sit).then(() => {
        this.unit.spriteSheet.animationFrameChanged
          .unsubscribe(this.changePositionByFrameWithContext);

        this.unit.transform.position = new Point(this.lastFixedPosition.x,
          this.lastFixedPosition.y);

        return this.internal.stateFactory.createState(inputState);
      });
    }
  }
}

export default SitState;
