
import React, { useState, useReducer, useEffect, useRef } from "react";
import CanvasJSReact from '../assets/canvasjs.react';
import { getOptions } from '../actions/mountGraphData';
import { Slider, Typography } from '@material-ui/core';
import {fetchCountries} from '../actions/countries';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;



export const CountriesContainer = () => {

  const initialState = {countries: [{y: 0, label: 'Country'}], casesFilter: 500000};

  const [state, dispatch] = useReducer((state, action) => {
    switch(action.type) {
      case 'FETCH_COUNTRIES':
        return {
          ...state,
          countries: action.payload,
        }
      case 'FILTER':
        return {
          ...state,
          casesFilter: action.payload,
        }
      default: return state;
    }
  }, initialState);

  const componentIsMounted = useRef(true);

  useEffect(() => {   
      fetchCountries()
        .then(response => {
          console.log(response)
          if (componentIsMounted.current) {
            dispatch({type: 'FETCH_COUNTRIES', payload: response})
          }
        })
        .catch(err => {
          console.log("Failed fetch", err);
        });
      return () => {
        componentIsMounted.current = false;
      };
    }, []);

  const options = getOptions(state.countries, state.casesFilter);
  console.log(options)

  return (
    <>
      <div className="countries-container">
        <CanvasJSChart options={options} />
      </div>
      <Typography id="non-linear-slider" gutterBottom>
        Number of cases
        </Typography>
      <Slider
        value={state.casesFilter}
        min={0}
        step={100000}
        max={10000000}
       // scale={(x) => x}
        //  getAriaValueText={valueLabelFormat}
        // valueLabelFormat={valueLabelFormat}
        onChange={(event, number) => {
          console.log(number)
          console.log(state)
          dispatch({type: 'FILTER', payload: number});
        }
        }
        valueLabelDisplay="auto"
        aria-labelledby="linear-slider"
      />
    </>
  );

}