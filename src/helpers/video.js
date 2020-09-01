export const computeAspectRatio = aspectRatioString => {
  if (!aspectRatioString) return 'N/A';
  const aspectRatioComponents = aspectRatioString
    .split(':')
    .map(n => parseInt(n));
  let aspectRatio;
  if (aspectRatioComponents.length === 2) {
    const ratio = aspectRatioComponents[1] / aspectRatioComponents[0];
    if (ratio === 9 / 16) {
      aspectRatio = '16:9';
    } else if (ratio === 3 / 4) {
      aspectRatio = '4:3';
    } else if (ratio === 16 / 9) {
      aspectRatio = '9:16';
    } else {
      aspectRatio = 'N/A';
    }
  }

  return aspectRatio;
};
