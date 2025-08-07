import React from "react";

import Slider from "../Components/slider";
import Section1 from "../Components/section";
import {Section2,Section3,Section4,Section5,Section6,Section7,Section8,Section9} from "../Components/section";

export default function Home() {
    return (
        <div className="min-h-screen ">
            <Slider />
            <Section1 />
            <Section2 />
            <Section3 />
            <Section4 />
            <Section5 />
            <Section6 />
            <Section7 />
            <Section8 />
            <Section9 />
        </div>
    );
}