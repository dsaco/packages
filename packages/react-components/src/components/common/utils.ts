export const darken = (color: string, percent: number) => {
  if (color.startsWith('#')) {
    const red = parseInt(color.substring(1, 3), 16);
    const green = parseInt(color.substring(3, 5), 16);
    const blue = parseInt(color.substring(5, 7), 16);

    const darkenedRed = Math.round((red * (100 - percent)) / 100);
    const darkenedGreen = Math.round((green * (100 - percent)) / 100);
    const darkenedBlue = Math.round((blue * (100 - percent)) / 100);

    console.log(darkenedRed, darkenedGreen, darkenedBlue);
    const darkenedColor = (
      (darkenedRed << 16) |
      (darkenedGreen << 8) |
      darkenedBlue
    ).toString(16);

    console.log(darkenedColor);
  }
};

export const lighten = (color: string, percent: number) => {
  if (color.startsWith('#')) {
    const red = parseInt(color.substring(1, 3), 16);
    const green = parseInt(color.substring(3, 5), 16);
    const blue = parseInt(color.substring(5, 7), 16);

    const darkenedRed = Math.round((red * (100 + percent)) / 100);
    const darkenedGreen = Math.round((green * (100 + percent)) / 100);
    const darkenedBlue = Math.round((blue * (100 + percent)) / 100);

    console.log(darkenedRed, darkenedGreen, darkenedBlue);
    const darkenedColor = (
      (darkenedRed << 16) |
      (darkenedGreen << 8) |
      darkenedBlue
    ).toString(16);

    console.log(darkenedColor);
  }
};
