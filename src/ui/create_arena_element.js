import createLayerElementElement from './create_layer_element_element';

let layerElments;
/**
 * @typedef {import('../core/arenas/arena').default} Arena
 * @typedef {import('../core/arenas/camera').default} Camera
 * @param {Arena} arena
 * @param {Camera} camera
 * @returns {Element}
 */
function createArenaElement(arena, camera) {
  const arenaElement = document.createElement('div');

  arenaElement.style.width = `${arena.width}px`;
  arenaElement.style.height = `${arena.height}px`;
  arenaElement.style.background = '#303 no-repeat';
  arenaElement.style.position = 'relative';

  layerElments = [];
  arena.layers.forEach((layer) => {
    layer.elements.forEach((layerElement) => {
      const layerElementElement = createLayerElementElement(layerElement);
      layerElments.push({
        layerElement,
        element: layerElementElement,
      });
      arenaElement.append(layerElementElement);
    });
  });

  camera.positionChanged.subscribe((position, parallaxElements) => {
    parallaxElements.forEach((parallaxElement) => {
      const foundLayer = layerElments
        .find(p => p.layerElement === parallaxElement.arenaLayerElement);

      foundLayer.element.style.top = `${parallaxElement.position.y}px`;
      foundLayer.element.style.left = `${parallaxElement.position.x}px`;
    });
  });

  return arenaElement;
}

export default createArenaElement;
