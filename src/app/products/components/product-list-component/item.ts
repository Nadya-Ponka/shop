export enum State {
 outOfStock = 0,
 available = 1
}

export class Item {

 constructor(
  public id: number,
  public size: string[],
  public colors: string[],
  public image: string,
  public name: string,
  public price: number,
  public whose: string,
  public category: State
 ) {
  this.id = id || null;
  this.size = size;
  this.colors = colors;
  this.image = image;
  this.name = name;
  this.price = price,
  this.whose = whose;
  this.category = category;
 }
}
