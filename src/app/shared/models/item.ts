export enum State {
  outOfStock = 0,
    available = 1
}

export interface Element {
  id: number;
  size: string[];
  colors: string[];
  image: string;
  name: string;
  price: number;
  category: State;
  reviews?: string[];
}

export class Item implements Element {
  constructor(
    public id: number,
    public size: string[],
    public colors: string[],
    public image: string,
    public name: string,
    public price: number,
    public category: State,
    public reviews?: string[]
  ) {
    this.image = image || 'unknown';
    this.reviews = reviews || [];
  }
}
