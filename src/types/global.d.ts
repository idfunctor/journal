export {};
import { ISplittingStatic } from 'splitting';

declare global {

  interface Window {
    Splitting: ISplittingStatic
  }
}
