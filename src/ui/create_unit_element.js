/**
 * @typedef {import('../core/entities/units/unit_base').default} UnitBase
 * @param {UnitBase} unit
 * @return {Element}
 */
function createUnitElement(unit) {
  const unitElement = document.createElement('div');

  unitElement.style.background = `url(${unit.spriteSheet.image}) no-repeat`;
  unitElement.style.position = 'absolute';
  unitElement.style.zIndex = 1000000;
  unitElement.style.marginLeft = `${unit.transform.position.x}px`;
  unitElement.style.marginTop = `${unit.transform.position.y}px`;
  // unitElement.style.transform = 'scaleX(-1)';

  unit.transform.positionChanged.subscribe((e) => {
    unitElement.style.marginLeft = `${e.position.x}px`;
    unitElement.style.marginTop = `${e.position.y}px`;
  });

  unit.spriteSheet.animationFrameChanged.subscribe((animation, frame) => {
    unitElement.style.width = `${frame.width}px`;
    unitElement.style.height = `${frame.height}px`;
    unitElement.style.backgroundPosition = `-${frame.offset.x}px -${frame.offset.y}px`;
  });

  return unitElement;
}

export default createUnitElement;
