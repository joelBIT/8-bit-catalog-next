'use client';

import { useState, type ReactElement } from "react";

import "./RangeSlider.css";

/**
 * Slider for changing how many games are visible in the search result. 
 * When mouse state is "up" the parent is called with that chosen value (avoids parent rerendering all the time when sliding).
 */
export function RangeSlider({min, max, setSliderValue}: {min: number, max: number, setSliderValue: (value: number) => void}): ReactElement {
    const [value, setValue] = useState<number>(min);

    return (
        <section className="rangeSlider">
            <input 
                type="range" 
                min={min} 
                step="1" 
                max={max} 
                value={value >= max ? max : value} 
                className="slider" 
                onInput={(e) => setValue(parseInt((e.target as HTMLInputElement).value))} 
                onMouseUp={(e) => setSliderValue(parseInt((e.target as HTMLInputElement).value))} 
            />

            <h2 className="slider-text"> Showing {value >= max ? max : value} / {max} games</h2>
        </section>
    )
}