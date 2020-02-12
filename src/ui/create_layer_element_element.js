/**
 * @typedef {import('../core/arenas/arena_layer_element').default} ArenaLayerElement
 * @param {ArenaLayerElement} layerElement
 * @returns {Element}
 */
function createLayerElementElement(layerElement) {
  const layerElementElement = document.createElement('div');

  layerElementElement.style.background = `url(${layerElement.link}) no-repeat`;
  layerElementElement.style.width = `${layerElement.width}px`;
  layerElementElement.style.height = `${layerElement.height}px`;
  layerElementElement.style.top = `${layerElement.position.y}px`;
  layerElementElement.style.left = `${layerElement.position.x}px`;
  layerElementElement.style.position = 'absolute';
  layerElementElement.style.zIndex = `${layerElement.zIndex}`;

  return layerElementElement;
}

export default createLayerElementElement;
