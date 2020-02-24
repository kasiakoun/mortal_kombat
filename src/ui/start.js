import ArenaController from '../core/arenas/arena_controller';
import Arenas from '../core/arenas/arenas';
import Animations from '../core/animation/animations';
import Camera from '../core/arenas/camera';
import createArena from '../core/arenas/arena_factory';
import createArenaElement from './create_arena_element';
import createCameraElement from './create_camera_element';
import createUnitElement from './create_unit_element';
import CameraController from '../core/arenas/camera_controller';
import CollisionDetector from '../core/game_space/collision_detector';
import MoveEnabler from '../core/game_space/move_enabler';
import UnitFactory from '../core/unit_factory';
import Units from '../core/entities/units/units';
import Point from '../core/point';
import PlayerInput from '../core/player/player_input';
import InputEventType from '../core/player/input_event_type';
import InputType from '../core/player/input_type';

let gameElement;
let cameraElement;

function startUpdatingElements() {
  setInterval(() => {
    gameElement.innerHTML = cameraElement.outerHTML;

    const currentCameraElement = gameElement.getElementsByClassName('camera-element')[0];
    const currentCameraPositionElement = currentCameraElement.getElementsByClassName('camera-position-element')[0];

    currentCameraElement.scrollLeft = parseInt(currentCameraPositionElement.style.marginLeft, 10);
    currentCameraElement.scrollTop = parseInt(currentCameraPositionElement.style.marginTop, 10);
  }, 10);
}

/**
 * @returns {Element}
 */
function start() {
  const arena = createArena(Arenas.waterfront);
  const camera = new Camera(arena, 400, 254);
  const collisionDetector = new CollisionDetector();
  const cameraController = new CameraController(camera);
  const arenaController = new ArenaController(arena);
  const moveEnabler = new MoveEnabler(cameraController, arenaController);

  const unitFactory = new UnitFactory(collisionDetector, moveEnabler);
  const leftUnitinitialPosition = new Point(60, 100);
  const leftUnit = unitFactory.createUnit(Units.cyrax, leftUnitinitialPosition);
  leftUnit.spriteSheet.playAnimation(Animations.stance);
  cameraController.addUnit(leftUnit);

  const leftPlayerInput = new PlayerInput(leftUnit);

  gameElement = document.createElement('div');

  cameraElement = createCameraElement(camera);

  const arenaElement = createArenaElement(arena, camera);
  cameraElement.append(arenaElement);

  const leftUnitElement = createUnitElement(leftUnit);
  arenaElement.append(leftUnitElement);

  startUpdatingElements();

  const keysDictionary = {
    ArrowLeft: InputType.backward,
    ArrowUp: InputType.upward,
    ArrowRight: InputType.forward,
    ArrowDown: InputType.downward,
  };

  window.addEventListener('keydown', (e) => {
    e.preventDefault();
    const inputEventType = e.repeat ? InputEventType.down : InputEventType.press;
    const inputType = keysDictionary[e.code];

    leftPlayerInput.handleInput(inputEventType, inputType);
  });

  window.addEventListener('keyup', (e) => {
    e.preventDefault();
    const inputType = keysDictionary[e.code];

    leftPlayerInput.handleInput(InputEventType.up, inputType);
  });

  return gameElement;
}

export default start;
