class Physics {
  static get accelerationOfGravity() {
    return 9.8;
  }

  /**
   * Calculates the equationy of the constant acceleration motion(
   * or uniformly accelerated rectilinear motion)
   * y = y0 + v0 * t + 1/2 * a * t^2
   * @param {number} velocity Velocity of the body at the initial time (v0)
   * @param {number} time The moment of time in milleseconds / 100 (t)
   * @param {number} position Position of the body at the initial time (y0)
   * @returns {number} Returns position at the current moment of time (y)
   */
  static calculateUniformlyAcceleratedRectilinearMotion(velocity, time, position) {
    return position + velocity * time - Physics.accelerationOfGravity * (time ** 2) / 2;
  }

  /**
   * Calculates a distance length in the current period of time
   * s = s0 + v * t
   * @param {number} averageVelocity Average velocity of the body (v)
   * @param {number} time The moment of time in milleseconds / 100 (t)
   * @param {number} position Position of the body at the initial time (s0)
   * @returns {number} Returns position at the current moment of time (s)
   */
  static calculateDistanceByAverageVelocity(averageVelocity, time, position) {
    return position + averageVelocity * time;
  }
}

export default Physics;
