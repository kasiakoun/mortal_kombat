import Observable from './core/observable';
import CollisionDetector from './core/game_space/collision_detector';
import UnitFactory from './core/unit_factory';
import Units from './core/units/units';
import Point from './core/point';
import Animations from './core/animation/animations';
import WalkForwardCommand from './core/commands/walk_forward_command';
import WalkBackwardCommand from './core/commands/walk_backward_command';
import createArena from './core/arenas/arena_factory';
import Arenas from './core/arenas/arenas';
import Camera from './core/arenas/camera';

debugger;
const arena = createArena(Arenas.waterfront);
const camera = new Camera(arena, 400, 254);

const arenaElement = document.createElement('div');
arenaElement.style.width = `${camera.width}px`;
arenaElement.style.height = `${camera.height}px`;
arenaElement.style.background = '#303 no-repeat';
arenaElement.style.position = 'relative';
arenaElement.style.overflow = 'hidden';
document.body.append(arenaElement);

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

camera.positionChanged.subscribe((layerElement, position) => {
  const foundLayer = layerElments.find(p => p.layerElement === layerElement);
  if (!foundLayer) return;
  foundLayer.element.style.top = `${position.y}px`;
  foundLayer.element.style.left = `${position.x}px`;
});
let positionX = 0;
setInterval(() => {
  positionX -= 3;
  camera.setPosition(new Point(positionX, 0));
}, 50);
