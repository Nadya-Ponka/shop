export enum State {
 outOfStock = 0,
 available = 1
}

export class Item {
 constructor(
  public id: number = null,
  public size: string[],
  public colors: string[],
  public image: string,
  public name: string,
  public price: number,
  public whose: string,
  public category: State
 ) {}
}