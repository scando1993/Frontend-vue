// Enable data zoom when user click bar.
// eslint-disable-next-line no-unused-vars
export const zoomBarData = function(data, yMax, dataShadow) {
  var _data = [
    220,
    182,
    191,
    234,
    290,
    330,
    310,
    123,
    442,
    321,
    90,
    149,
    210,
    122,
    133,
    334,
    198,
    123,
    125,
    220
  ];
  var _yMax = 500;
  var _dataShadow = [];

  for (var i = 0; i < _data.length; i++) {
    _dataShadow.push(_yMax);
  }
  // Enable data zoom when user click bar.
  var zoomSize = 6;
  // eslint-disable-next-line no-undef
  myChart.on('click', function(params) {
    // eslint-disable-next-line no-undef
    console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
    // eslint-disable-next-line no-undef
    myChart.dispatchAction({
      type: 'dataZoom',
      // eslint-disable-next-line no-undef
      startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
      endValue:
      // eslint-disable-next-line no-undef
        dataAxis[Math.min(params.dataIndex + zoomSize / 2, _data.length - 1)]
    });
  });
};
