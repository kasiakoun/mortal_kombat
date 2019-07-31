import Observable from './core/observable';
import CollisionDetector from './core/game_space/collision_detector';
import UnitFactory from './core/unit_factory';
import Units from './core/units/units';
import Point from './core/point';

const collisionDetector = new CollisionDetector();
const unitFactory = new UnitFactory(collisionDetector);

const testUnit1 = unitFactory.createUnit(Units.cyrax);
const testUnit2 = unitFactory.createUnit(Units.cyrax);

collisionDetector.collided.subscribe((unit1, unit2) => {
  console.log(`(${unit1.position.x}, ${unit1.position.y}), (${unit2.position.x}, ${unit2.position.y})`);
});

function test() {
  const x1 = Math.floor(Math.random() * 1000);
  const y1 = Math.floor(Math.random() * 1000);
  const x2 = Math.floor(Math.random() * 1000);
  const y2 = Math.floor(Math.random() * 1000);
  testUnit1.position = new Point(x1, y1);
  testUnit2.position = new Point(x2, y2);
}

function sleep(delay) {
  const start = new Date().getTime();
  while (new Date().getTime() < start + delay);
}

while (true) {
  test();
  sleep(300);
}
