import { Color } from './color';

describe('Color generate', () => {
  it('input rgb', () => {
    expect(Color('rgb(255 0 0)').rgb).toEqual('rgb(255 0 0)');
    expect(Color('rgb(255 0 0 / 50%)').rgb).toEqual('rgb(255 0 0)');
    expect(Color('rgb(255 0 0 / 0.5)').rgb).toEqual('rgb(255 0 0)');
    expect(Color('rgb(255, 0, 0)').rgb).toEqual('rgb(255 0 0)');
    expect(Color('rgba(255, 0, 0, 0.5)').rgb).toEqual('rgb(255 0 0)');
    expect(Color('rgba(255, 0, 0, 50%)').rgb).toEqual('rgb(255 0 0)');
    expect(Color('rgb(300 0 0)').rgb).toEqual('rgb(255 0 0)');

    expect(Color('rgb(100.1 100.2 100.3)').rgb).toEqual(
      'rgb(100.1 100.2 100.3)'
    );
    expect(Color('rgb(100.1 100.2 100.3 / 50.5%)').rgba).toEqual(
      'rgb(100.1 100.2 100.3 / 51%)'
    );
    expect(Color('rgb(100.1 100.5 100.9 / 50.5%)').hexa).toEqual('#64656581');

    // expect(Color('rgba(-300, 0, 0, 0.5)').rgb).toEqual('rgb(255 0 0)');
    // expect(Color('rgba(300.5, 0, 0, 0.5)').rgb).toEqual('rgb(255 0 0)');
    // const rgba = Color('rgb(10 10 10 / 0.5)');
    // const rgba2 = Color('rgb(10.1 10.2 10.3 / 10.8%)');
    // const rgba3 = Color('rgb(  10 10   10 )');
    // const rgba4 = Color('rgb(10.1 10.2 10.3 )');
  });
  it('input hex', () => {
    expect(Color('#f00').rgb).toEqual('rgb(255 0 0)');
    expect(Color('#f008').rgb).toEqual('rgb(255 0 0)');
    expect(Color('#ff0000').rgb).toEqual('rgb(255 0 0)');
    expect(Color('#ff0000ff').rgb).toEqual('rgb(255 0 0)');
    expect(Color('#64656581').rgb).toEqual('rgb(100 101 101)');
    expect(Color('#64656581').rgba).toEqual('rgb(100 101 101 / 51%)');
  });
});
