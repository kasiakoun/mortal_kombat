import Arena from '../arenas/arena';
import ArenaLayer from '../arenas/arena_layer';
import ArenaLayerElement from '../arenas/arena_layer_element';
import Point from '../point';

function convertJsonToArena(jsonObject) {
  const layers = jsonObject.layers.map((layer) => {
    const arenaLayerElements = layer.elements.map((element) => {
      const position = new Point(element.x, element.y);
      return new ArenaLayerElement(element.link, element.width, element.height,
        element.zIndex, position);
    });

    return new ArenaLayer(arenaLayerElements, layer.speed);
  });

  return new Arena(jsonObject.width, jsonObject.height, layers);
}

export default convertJsonToArena;
