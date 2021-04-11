const echarts = require('./static/echarts.min.js');
const { createCanvas } = require('canvas');
const { getLineChartOption} = require('./static/charting.js');
const fs = require('fs');

const legend = ['test'];
const xData = [1,2,3];
const yData = [1,2,3];
const imageId = 'test';

const canvas = createCanvas(800, 600);
//const ctx = canvas.getContext('2d');

echarts.setCanvasCreator(function () {
    return canvas;
});

let chart = echarts.init(createCanvas(800, 600));
chart.setOption(getLineChartOption(xData, yData, legend));

fs.writeFileSync('./img/'+imageId+'.png', chart.getDom().toBuffer());
