import Observable from './core/observable';
import CollisionDetector from './core/game_space/collision_detector';
import UnitFactory from './core/unit_factory';
import Units from './core/units/units';
import Point from './core/point';
import spriteJsonConvert from './core/animation/sprite_json_convert';
import Animations from './core/animation/animations';

debugger;
const collisionDetector = new CollisionDetector();
const unitFactory = new UnitFactory(collisionDetector);
const cyrax = unitFactory.createUnit(Units.cyrax);

const unitElement = document.createElement('div');
unitElement.style.background = `url(${cyrax.spriteSheet.image}) no-repeat`;
unitElement.style.position = 'absolute';
document.body.append(unitElement);

cyrax.spriteSheet.animationFrameChanged.subscribe((animation, frame) => {
  unitElement.style.width = `${frame.width}px`;
  unitElement.style.height = `${frame.height}px`;
  unitElement.style.backgroundPosition = `-${frame.offset.x}px -${frame.offset.y}px`;
});
cyrax.spriteSheet.playAnimation(Animations.stance);

// const collisionDetector = new CollisionDetector();
// const unitFactory = new UnitFactory(collisionDetector);

// const testUnit1 = unitFactory.createUnit(Units.cyrax);
// const testUnit2 = unitFactory.createUnit(Units.cyrax);

// collisionDetector.collided.subscribe((unit1, unit2) => {
//   console.log(`(${unit1.position.x}, ${unit1.position.y}), (${unit2.position.x}, ${unit2.position.y})`);
// });

// const containerElement = document.createElement('div');
// containerElement.style.position = 'absolute';

// const unitElement1 = document.createElement('div');
// unitElement1.style.background = 'teal';
// unitElement1.style.width = `${testUnit1.width}px`;
// unitElement1.style.height = `${testUnit1.height}px`;
// unitElement1.style.position = 'absolute';

// const unitElement2 = document.createElement('div');
// unitElement2.style.background = 'purple';
// unitElement2.style.width = `${testUnit2.width}px`;
// unitElement2.style.height = `${testUnit2.height}px`;
// unitElement2.style.position = 'absolute';

// containerElement.append(unitElement1, unitElement2);
// document.body.append(containerElement);

// setInterval(() => {
//   const x1 = Math.floor(Math.random() * 500);
//   const y1 = Math.floor(Math.random() * 500);
//   const x2 = Math.floor(Math.random() * 500);
//   const y2 = Math.floor(Math.random() * 500);

//   testUnit1.position = new Point(x1, y1);
//   testUnit2.position = new Point(x2, y2);

//   unitElement1.style.marginLeft = `${x1}px`;
//   unitElement1.style.marginTop = `${y1}px`;

//   unitElement2.style.marginLeft = `${x2}px`;
//   unitElement2.style.marginTop = `${y2}px`;
// }, 5000);
