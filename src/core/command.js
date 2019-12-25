
class Command {
  /**
   * Invokes the command
   */
  execute() {
    throw new Error(`execute is not implemented in '${this.constructor.name}' class`);
  }
}

export default Command;
