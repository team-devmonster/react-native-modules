import { Img } from "@team-devmonster/react-native-tags"
import { useRef, useState } from "react";
import { Dimensions, Image, ImageSourcePropType } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"

export type ImgViewerItemSrcType = string | ImageSourcePropType;
export type ImgViewerItemProps = {
  src:ImgViewerItemSrcType
}
export const ImgViewerItem = ({ src }:ImgViewerItemProps) => {
  const { width, height } = Dimensions.get('window');

  const ref = useRef<Image>(null);
  const [imgLayout, setImgLayout] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const scale = useSharedValue(1);
  const savedScale = useRef(1);

  const pinchGesture = Gesture.Pinch()
  .onUpdate((e) => {
    scale.value = savedScale.current * e.scale;
  })
  .onEnd(() => {
    if(scale.value < 1) {
      scale.value = withTiming(1, {duration: 100});
      savedScale.current = 1;
    }
    else {
      savedScale.current = scale.value;
    }
  });

  const positionX = useSharedValue(0);
  const positionY = useSharedValue(0);
  const savedPositionX = useRef(0);
  const savedPositionY = useRef(0);

  const panGesture = Gesture.Pan()
  .minDistance(30)
  .onUpdate((e) => {
    const x = savedPositionX.current;
    const y = savedPositionY.current;
    positionX.value = x + e.translationX;
    positionY.value = y + e.translationY;
  })
  .onEnd((e) => {
    const left = (width - imgLayout.width*savedScale.current)/2;
    console.log(left);
    if(positionX.value > left) {
      positionX.value = withTiming(0, {duration: 100});
      savedPositionX.current = 0;
    }
    else if(positionX.value + imgLayout.width < width) {
      positionX.value = withTiming(0, {duration: 100});
      savedPositionX.current = 0;
    }
    else {
      savedPositionX.current = positionX.value;
    }

    if(positionY.value > 0) {
      positionY.value = withTiming(0, {duration: 100});
      savedPositionY.current = 0;
    }
    else if(positionY.value + imgLayout.height < height) {
      positionY.value = withTiming(0, {duration: 100});
      savedPositionY.current = 0;
    }
    else {
      savedPositionY.current = positionY.value;
    }
  });

  const pinchAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value }
    ]
  }));
  const panAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: positionX.value },
      { translateY: positionY.value }
    ]
  }));
  
  return (
    <GestureDetector gesture={pinchGesture}>
      <Animated.View style={[{ width, height }, pinchAnimatedStyle]}>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[{ flex: 1 }, panAnimatedStyle]}>
            <Img 
              ref={ref} 
              src={src} 
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain' }}
              onLayout={(e) => {
                const layout = e.nativeEvent.layout;
                setImgLayout(layout);
              }}
            />
          </Animated.View>
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  )
}