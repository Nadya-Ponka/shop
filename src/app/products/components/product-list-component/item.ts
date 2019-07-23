// Этот файл переместить в папку models и вынести из компонента
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
 ) {
  //  Не нужно это делать, если есть модификатор для параметра
  // this.id = id || null;
  // this.size = size;
  // this.colors = colors;
  // this.image = image;
  // this.name = name;
  // this.price = price,
  // this.whose = whose;
  // this.category = category;
 }
}
