import CollisionDetector from './core/game_space/collision_detector';
import UnitFactory from './core/unit_factory';
import Units from './core/entities/units/units';
import Point from './core/point';
import WalkForwardCommand from './core/commands/walk_forward_command';
import WalkBackwardCommand from './core/commands/walk_backward_command';
import createArena from './core/arenas/arena_factory';
import Arenas from './core/arenas/arenas';
import Camera from './core/arenas/camera';
import Transform from './core/transform';
import CameraController from './core/arenas/camera_controller';
import Animations from './core/animation/animations';
import MoveEnabler from './core/game_space/move_enabler';
import ArenaController from './core/arenas/arena_controller';

const arena = createArena(Arenas.waterfront);
const camera = new Camera(arena, 400, 254);

const gameElement = document.createElement('div');
document.body.append(gameElement);

const cameraElement = document.createElement('div');
cameraElement.className = 'camera-element';
cameraElement.style.width = `${camera.width}px`;
cameraElement.style.height = `${camera.height}px`;
cameraElement.style.overflow = 'hidden';
cameraElement.style.position = 'relative';

const cameraPositionElement = document.createElement('div');
cameraPositionElement.className = 'camera-position-element';
cameraPositionElement.style.display = 'none';
cameraElement.append(cameraPositionElement);

// document.body.append(cameraElement);
// gameFrameElement.append(cameraElement);

const arenaElement = document.createElement('div');
arenaElement.style.width = `${arena.width}px`;
arenaElement.style.height = `${arena.height}px`;
arenaElement.style.background = '#303 no-repeat';
arenaElement.style.position = 'relative';
cameraElement.append(arenaElement);

const collisionDetector = new CollisionDetector();
const cameraController = new CameraController(camera);
const arenaController = new ArenaController(arena);
const moveEnabler = new MoveEnabler(cameraController, arenaController);
const unitFactory = new UnitFactory(collisionDetector, moveEnabler);

//CREATE LEFT UNIT==================================================================
// const leftCyraxInitialPosition = new Point(60, 100);
// const leftCyrax = unitFactory.createUnit(Units.cyrax, leftCyraxInitialPosition);

// const leftUnitElement = document.createElement('div');
// leftUnitElement.style.background = `url(${leftCyrax.spriteSheet.image}) no-repeat`;
// leftUnitElement.style.position = 'absolute';
// leftUnitElement.style.zIndex = 1000000;
// leftUnitElement.style.marginLeft = `${leftCyrax.transform.position.x}px`;
// leftUnitElement.style.marginTop = `${leftCyrax.transform.position.y}px`;
// arenaElement.append(leftUnitElement);

// leftCyrax.transform.positionChanged.subscribe((e) => {
//   leftUnitElement.style.marginLeft = `${e.position.x}px`;
//   leftUnitElement.style.marginTop = `${e.position.y}px`;
// });

// leftCyrax.spriteSheet.animationFrameChanged.subscribe((animation, frame) => {
//   leftUnitElement.style.width = `${frame.width}px`;
//   leftUnitElement.style.height = `${frame.height}px`;
//   leftUnitElement.style.backgroundPosition = `-${frame.offset.x}px -${frame.offset.y}px`;
// });

// leftCyrax.spriteSheet.playAnimation(Animations.stance);
//CREATE LEFT UNIT==================================================================

//CREATE RIGHT UNIT=================================================================
const rightCyraxInitialPosition = new Point(150, 100);
const rightCyrax = unitFactory.createUnit(Units.cyrax, rightCyraxInitialPosition);

const rightUnitElement = document.createElement('div');
rightUnitElement.style.background = `url(${rightCyrax.spriteSheet.image}) no-repeat`;
rightUnitElement.style.position = 'absolute';
rightUnitElement.style.zIndex = 1000000;
rightUnitElement.style.marginLeft = `${rightCyrax.transform.position.x}px`;
rightUnitElement.style.marginTop = `${rightCyrax.transform.position.y}px`;
rightUnitElement.style.transform = 'scaleX(-1)';
arenaElement.append(rightUnitElement);

rightCyrax.transform.positionChanged.subscribe((e) => {
  rightUnitElement.style.marginLeft = `${e.position.x}px`;
  rightUnitElement.style.marginTop = `${e.position.y}px`;
});

rightCyrax.spriteSheet.animationFrameChanged.subscribe((animation, frame) => {
  rightUnitElement.style.width = `${frame.width}px`;
  rightUnitElement.style.height = `${frame.height}px`;
  rightUnitElement.style.backgroundPosition = `-${frame.offset.x}px -${frame.offset.y}px`;
});

const moveCommand = new WalkForwardCommand(rightCyrax.spriteSheet,
  rightCyrax.internal.moveController);
moveCommand.execute();
//CREATE RIGHT UNIT==================================================================

// cameraController.addUnit(leftCyrax);
cameraController.addUnit(rightCyrax);
const layerElments = [];
arena.layers.forEach((layer) => {
  layer.elements.forEach((layerElement) => {
    const layerElementElement = document.createElement('div');
    layerElementElement.style.background = `url(${layerElement.link}) no-repeat`;
    layerElementElement.style.width = `${layerElement.width}px`;
    layerElementElement.style.height = `${layerElement.height}px`;
    layerElementElement.style.top = `${layerElement.position.y}px`;
    layerElementElement.style.left = `${layerElement.position.x}px`;
    layerElementElement.style.position = 'absolute';
    layerElementElement.style.zIndex = `${layerElement.zIndex}`;
    layerElments.push({
      layerElement,
      element: layerElementElement,
    });
    arenaElement.append(layerElementElement);
  });
});
camera.positionChanged.subscribe((position, parallaxElements) => {
  parallaxElements.forEach((parallaxElement) => {
    const foundLayer = layerElments.find(p => p.layerElement === parallaxElement.arenaLayerElement);
    foundLayer.element.style.top = `${parallaxElement.position.y}px`;
    foundLayer.element.style.left = `${parallaxElement.position.x}px`;
  });

  // cameraElement.scrollLeft = position.x;
  // cameraElement.scrollTop = position.y;

  cameraPositionElement.style.marginLeft = `${position.x}px`;
  cameraPositionElement.style.marginTop = `${position.y}px`;
});
// let positionX = 0;
// setInterval(() => {
//   positionX += 2;
//   camera.position = new Point(positionX, 0);
// }, 30);

//UPDATE ALL ELEMENTS AT THE SAME TIME============================================================================
setInterval(() => {
  gameElement.innerHTML = cameraElement.outerHTML;

  const currentCameraElement = gameElement.getElementsByClassName('camera-element')[0];
  const currentCameraPositionElement = currentCameraElement.getElementsByClassName('camera-position-element')[0];

  currentCameraElement.scrollLeft = parseInt(currentCameraPositionElement.style.marginLeft, 10);
  currentCameraElement.scrollTop = parseInt(currentCameraPositionElement.style.marginTop, 10);
}, 10);
//UPDATE ALL ELEMENTS AT THE SAME TIME============================================================================