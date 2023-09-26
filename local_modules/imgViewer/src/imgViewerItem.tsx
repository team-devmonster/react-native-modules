import { Img } from "@team-devmonster/react-native-tags"
import { Dimensions, ImageSourcePropType } from "react-native";
import { GestureDetector, Gesture } from "react-native-gesture-handler"
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"

export type ImgViewerItemSrcType = string | ImageSourcePropType;
export type ImgViewerItemProps = {
  src:ImgViewerItemSrcType
}
export const ImgViewerItem = ({ src }:ImgViewerItemProps) => {
  const { width, height } = Dimensions.get('window');
  const scale = useSharedValue(1);
  const savedScale = useSharedValue(1);

  const pinchGesture = Gesture.Pinch()
  .onUpdate((e) => {
    scale.value = savedScale.value * e.scale;
  })
  .onEnd(() => {
    if(scale.value < 1) {
      scale.value = withTiming(1, {duration: 100});
      savedScale.value = 1;
    }
    else {
      savedScale.value = scale.value;
    }
  });

  const position = useSharedValue({ x:0, y: 0 });
  const savedPosition = useSharedValue({ x:0, y:0 });

  const panGesture = Gesture.Pan()
  .minDistance(30)
  .onUpdate((e) => {
    const { x, y } = savedPosition.value;
    position.value = {
      x: x + e.translationX,
      y: y + e.translationY
    };
  })
  .onEnd((e) => {
    savedPosition.value = position.value;
  });

  const pinchAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value }
    ],
  }));
  const panAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: position.value.x },
      { translateY: position.value.y }
    ],
  }));
  
  return (
    <GestureDetector gesture={pinchGesture}>
      <Animated.View style={[{ width, height }, pinchAnimatedStyle]}>
        <GestureDetector gesture={panGesture}>
          <Animated.View style={[{ flex: 1 }, panAnimatedStyle]}>
            <Img src={src} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain' }}/>
          </Animated.View>
        </GestureDetector>
      </Animated.View>
    </GestureDetector>
  )
}