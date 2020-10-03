
import React, { useState, useEffect , useRef } from "react";
import CanvasJSReact from '../assets/canvasjs.react';
import { fetchCountries } from '../actions/countries';
import { getOptions } from '../actions/mountGraphData';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;



export const CountriesContainer = () => {
    const [countries, setCountries] = useState([{y: 0, label: 'Country'}])
    
    const componentIsMounted = useRef(true);

    const options = getOptions(countries, 500000);

    useEffect(() => {   
      fetchCountries()
        .then(response => {
          if (componentIsMounted.current) {
            setCountries(response);
          }
        })
        .catch(err => {
          console.log(err);
        });
      return () => {
        componentIsMounted.current = false;
      };
    }, []);

    return (
        <div className="countries-container">
            <CanvasJSChart options = {options} />
        </div>
    );
    
}