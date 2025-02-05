import { test } from '@fixtures';

/**
 * Decorator function for wrapping POM methods in a test.step.
 *
 * Use it without a step name `@step()`.
 *
 * Or with a step name `@step("Search something")`.
 *
 * @param stepName - The name of the test step.
 * @returns A decorator function that can be used to decorate test methods.
 */
export function step(stepName?: string) {
  return function decorator(target: Function, context: ClassMethodDecoratorContext) {
    return function replacementMethod(...args: any) {
      const name = `${this.constructor.name}.${stepName || (context.name as string)}`;
      return test.step(name, async () => {
        return await target.call(this, ...args);
      });
    };
  };
}
