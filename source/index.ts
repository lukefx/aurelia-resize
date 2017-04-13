import { PLATFORM } from 'aurelia-pal';

export {ResizeableCustomAttribute} from './resizeable';

export function configure(config) {
  config.globalResources(PLATFORM.moduleName('./resizeable'));
}
