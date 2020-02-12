/**
 * @typedef {import('../core/arenas/camera').default} Camera
 * @param {Camera} camera
 * @returns {Element}
 */
function createCameraElement(camera) {
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

  camera.positionChanged.subscribe((position) => {
    cameraPositionElement.style.marginLeft = `${position.x}px`;
    cameraPositionElement.style.marginTop = `${position.y}px`;
  });

  return cameraElement;
}

export default createCameraElement;
