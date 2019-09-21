import { OrderByPipe } from './order-by.pipe';

describe('OrderByPipe', () => {
	const pipe = new OrderByPipe();

  it('create an instance', () => {
    const pipe = new OrderByPipe();
    expect(pipe).toBeTruthy();
	});
	
	it('transforms [{elem:{},count:4},{elem:{},count:1},{elem:{},count:2}] to [{elem:{},count:4},{elem:{},count:2},{elem:{},count:1}]', () => {
		expect(pipe.transform([{elem:{},count:4},{elem:{},count:1},{elem:{},count:2}], 'count', true))
		.toEqual([{elem:{},count:4},{elem:{},count:2},{elem:{},count:1}]);
  });

  it('transforms [{elem:{name:Gleb},count:4},{elem:{name:Nadya},count:1},{elem:{name:Egor},count:2}] to [{elem:{name:Nadya},count:1},{elem:{name:Gleb},count:4},{elem:{name:Egor},count:2}]', () => {
		expect(pipe.transform([{elem:{name:'Gleb'},count:4},{elem:{name:'Nadya'},count:1},{elem:{name:'Egor'},count:2}], 'name', true))
		.toEqual([{elem:{name:'Nadya'},count:1},{elem:{name:'Gleb'},count:4},{elem:{name:'Egor'},count:2}]);
  });
	
});
