import { Color } from './Color';

describe('Color generate', () => {
  it('input rgb', () => {
    expect(Color('rgb(255 0 0)').rgb).toEqual('rgb(255 0 0)');
    expect(Color('rgb(255 0 0 / 50%)').rgb).toEqual('rgb(255 0 0)');
    expect(Color('rgb(255 0 0 / 0.5)').rgb).toEqual('rgb(255 0 0)');
    expect(Color('rgb(255, 0, 0)').rgb).toEqual('rgb(255 0 0)');
    expect(Color('rgba(255, 0, 0, 0.5)').rgb).toEqual('rgb(255 0 0)');
    expect(Color('rgba(255, 0, 0, 50%)').rgb).toEqual('rgb(255 0 0)');
    expect(Color('rgb(300 0 0)').rgb).toEqual('rgb(255 0 0)');

    expect(Color('rgb(100.1 100.5 100.9)').rgb).toEqual('rgb(100 101 101)');
    expect(Color('rgb(100.1 100.2 100.3 / 50.5%)').rgba).toEqual(
      'rgb(100 100 100 / 51%)'
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
    expect(Color('#64656584').rgba).toEqual('rgb(100 101 101 / 52%)');
    expect(Color('#64656581').rgba).toEqual('rgb(100 101 101 / 51%)');
    expect(Color('#64656580').rgba).toEqual('rgb(100 101 101 / 50%)');
    expect(Color('#b6ff0a').rgb).toEqual('rgb(182 255 10)');

    expect(Color('#64656584').hsla).toEqual('hsl(180deg 0.5% 39.41% / 51.76%)');
    expect(Color('#64656581').hsla).toEqual('hsl(180deg 0.5% 39.41% / 50.59%)');
    expect(Color('#64656580').hsla).toEqual('hsl(180deg 0.5% 39.41% / 50.2%)');
    expect(Color('#b6ff0a').hsl).toEqual('hsl(77.88deg 100% 51.96%)');
  });

  it('input rgb', () => {
    expect(Color('rgb(10, 20, 30)').hex).toEqual('#0a141e');
    expect(Color('rgb(10.1 20.5 30.9)').hex).toEqual('#0a151f');
    expect(Color('rgb(10.1 20.5 30.9 / 50.1%)').hexa).toEqual('#0a151f80');
    expect(Color('rgb(10.1 20.5 30.9 / 50.5%)').hexa).toEqual('#0a151f81');
    expect(Color('rgb(10.1 20.5 30.9 / 50.9%)').hexa).toEqual('#0a151f82');
    expect(Color('rgb(10.1 20.5 30.9 / 150.9%)').hexa).toEqual('#0a151fff');

    expect(Color('rgb(50.1 100.5 200.9 / 50.1%)').hsl).toEqual(
      'hsl(219.95deg 60.08% 49.22%)'
    );
    expect(Color('rgb(50.1 100.5 200.9 / 50.1%)').hsla).toEqual(
      'hsl(219.95deg 60.08% 49.22% / 50.1%)'
    );
    expect(Color('rgb(50.1 100.5 200.9 / 50.5%)').hsla).toEqual(
      'hsl(219.95deg 60.08% 49.22% / 50.5%)'
    );
    expect(Color('rgb(50.1 100.5 200.9 / 150.5%)').hsl).toEqual(
      'hsl(219.95deg 60.08% 49.22%)'
    );
    expect(Color('rgb(400.9 15 201)').hsl).toEqual('hsl(313.5deg 100% 52.94%)');
  });

  it('input hsl', () => {
    expect(Color('hsl(120deg 50% 50% / 50%)').hsl).toEqual(
      'hsl(120deg 50% 50%)'
    );
    expect(Color('hsl(120deg 50% 50% / 50%)').hsla).toEqual(
      'hsl(120deg 50% 50% / 50%)'
    );
    expect(Color('hsl(349.52deg 100% 87.65%)').hsl).toEqual(
      'hsl(350deg 100% 88%)'
    );
    expect(Color('hsl(349.52deg 100% 87.65%)').hsla).toEqual(
      'hsl(350deg 100% 88% / 100%)'
    );

    expect(Color('hsl(349.52deg 100% 87.65%)').rgb).toEqual('rgb(255 192 203)');
    expect(Color('hsl(349.52deg 100% 87.65% / 150%)').rgba).toEqual(
      'rgb(255 192 203 / 100%)'
    );
    expect(Color('hsl(349.52deg 100% 87.65% / 50.05%)').rgba).toEqual(
      'rgb(255 192 203 / 50%)'
    );
    expect(Color('hsl(300deg 100% 25.1%)').rgb).toEqual('rgb(128 0 128)');

    expect(Color('hsl(349.52deg 100% 87.65%)').hex).toEqual('#ffc0cb');
    expect(Color('hsl(349.52deg 100% 87.65% / 150%)').hexa).toEqual(
      '#ffc0cbff'
    );
    expect(Color('hsl(349.52deg 100% 87.65% / 50.05%)').hexa).toEqual(
      '#ffc0cb80'
    );
    expect(Color('hsl(300deg 100% 25.1%)').hex).toEqual('#800080');
  });
});
