
import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;


const addSymbols = (e) => {
    var suffixes = ["", "K", "M", "B"];
    var order = Math.max(Math.floor(Math.log(e.value) / Math.log(1000)), 0);
    if(order > suffixes.length - 1)
        order = suffixes.length - 1;
    var suffix = suffixes[order];
    return CanvasJS.formatNumber(e.value / Math.pow(1000, order)) + suffix;
}

export const getOptions = (countries, minCases) => {
        return {
        animationEnabled: true,
        theme: "light2",
        title:{
            text: "Covid Cases"
        },
        axisX: {
            title: "Country",
            reversed: true,
        },
        axisY: {
            title: "Cases",
            includeZero: true,
            labelFormatter: addSymbols
        },
        data: [{
            type: "bar",
            dataPoints: countries &&
                            countries
                            .filter(c => 
                                c.cases > minCases
                            )
                            .sort((a, b) =>  b.cases - a.cases)
                            .map(c => {
                                return {
                                    y: Number(c.cases), label: c.country
                                }
                            })
                            
        }]
    }   
}