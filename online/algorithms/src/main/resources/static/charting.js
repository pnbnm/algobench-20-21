
function getLineChartOption(xData, yData, legend){
    let option = {
        legend: {
            data: legend
        },
        toolbox: {
            show: true,
            feature: {
                /*dataZoom: {
                    yAxisIndex: 'none'
                },*/
                dataView: {readOnly: false,
                    title:'data view',lang:['data view', 'close', 'refresh']},
                magicType: {type: ['line', 'bar'],
                    title:{line:'switch to line', bar:'switch to bar'}},
                restore: {title:'restore'},
                saveAsImage: {title:'save as a image'}
            }
        },
        xAxis: {
            type: 'category',
            name : 'Input Size',
            nameLocation: 'center',
            nameGap: 35,
            data: xData
        },
        yAxis: {
            name : 'Time(ms)',
            nameLocation: 'center',
            nameGap: 35,
            type: 'value'
        },grid:{
            left:0
        },
        series: [{
            data: yData,
            name: legend[0],
            type: 'line'
        }]
    };

    return option
}

module.exports = {getLineChartOption};