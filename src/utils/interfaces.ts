
export namespace Util {

  export interface IObject<T = any> { [key: string]: T;}

  export interface IAction<T = any> {
    type: string;
    payload?: T;
  }

}