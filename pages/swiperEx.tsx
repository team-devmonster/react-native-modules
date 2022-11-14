import React from "react";

import { useTheme } from "@local_modules/theme";
import { Theme } from "App.theme";
import { Button, Div, P } from "@local_modules/tags";
import { Swiper } from "@local_modules/swiper/src/swiper";

const SwiperEx = () => {

  const { color, fontSize, shadow } = useTheme<Theme>();

  return (
    <Div>
      <Swiper 
        style={{ aspectRatio: 1 }}>
        <Div style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <P>hello1</P>
        </Div>
        <Div style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <P>hello2</P>
        </Div>
        <Div style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <P>hello3</P>
        </Div>
        <Div style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <P>hello4</P>
        </Div>
        <Div style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <P>hello5</P>
        </Div>
        <Div style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <P>hello6</P>
        </Div>
        <Div style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <P>hello7</P>
        </Div>
        <Div style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <P>hello8</P>
        </Div>
        <Div style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <P>hello9</P>
        </Div>
      </Swiper>
    </Div>
  )
}

export default SwiperEx;