import React, { useEffect, useRef, useState } from "react";
import { ScrollView, View, ViewStyle } from "react-native";


export interface SwiperProps {
  children?:React.ReactNode,
  style?:ViewStyle,
  slideStyle?:ViewStyle,
  slidePerView?:number
}

export const Swiper = ({ children, style, slideStyle, slidePerView = 1 }:SwiperProps) => {

  const scrollRef = useRef<ScrollView>(null);
  const [newChildren, setNewChildren] = useState<React.ReactNode>();
  const [width, setWidth] = useState(0);
  const [id] = useState(new Date().getTime());

  useEffect(() => {
    if(!width || slidePerView <= 0) return;
    if(Array.isArray(children)) {
      setNewChildren(children.map((child, i) => {
        return (
          <View 
            key={`slide_${id}_${i}`}
            style={{
              width: width/slidePerView,
              ...slideStyle
            }}>
            {child}
          </View>
        )
      }));
    }
    else if(children) {
      setNewChildren([
        <View 
          key={`slide_${id}_0`}
          style={{
            width: width/slidePerView,
            ...slideStyle
          }}>
          {children}
        </View>
      ]);
    }
    else {
      setNewChildren(null);
    }
  }, [width, slidePerView, children]);
  

  return (
    <ScrollView
      ref={scrollRef}
      horizontal={true}
      pagingEnabled={true}
      disableIntervalMomentum={true}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      scrollEventThrottle={32}
      bounces={false}
      directionalLockEnabled={true}
      snapToInterval={width/slidePerView}
      snapToAlignment={'center'}
      style={style}
      onLayout={(e) => {
        const { width } = e.nativeEvent.layout;
        setWidth(width);
      }}
      >
        {
          newChildren
        }
      </ScrollView>
  )
}