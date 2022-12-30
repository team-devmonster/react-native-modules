import { Button, ButtonStyle, Div, Img } from "@team-devmonster/react-native-tags";
import { ImageSourcePropType, Modal } from "react-native";
import { Gesture, GestureDetector, GestureHandlerRootView } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type ImgViewerProps = {
  src:string | ImageSourcePropType, 
  visible?:boolean, 
  onRequestClose?:() => void,
  closeText?:string,
  closeButtonStyle?:ButtonStyle
}
export const ImgViewer = ({ src, visible, onRequestClose, closeText, closeButtonStyle }:ImgViewerProps) => {

  const safe = useSafeAreaInsets();

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
    <Modal 
      visible={visible}
      onRequestClose={onRequestClose}
      transparent={true}
      animationType="fade"
    >
      <Div
        style={{ backgroundColor: '#000000', opacity: 0.3, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
      ></Div>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <GestureDetector gesture={pinchGesture}>
          <Animated.View style={[{ flex: 1 }, pinchAnimatedStyle]}>
            <GestureDetector gesture={panGesture}>
              <Animated.View style={[{ flex: 1 }, panAnimatedStyle]}>
                <Img src={src} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'contain' }}/>
              </Animated.View>
            </GestureDetector>
          </Animated.View>
        </GestureDetector>
      </GestureHandlerRootView>
      <Div >
        <Button 
          onClick={onRequestClose}
          color={closeButtonStyle?.backgroundColor || '#FF6420' as any}
          fill="none"
          style={{ 
            height: 44,
            backgroundColor: '#FF6420', 
            paddingBottom: safe.bottom, 
            borderRadius: 0,
            ...closeButtonStyle 
        }}>{ closeText || '닫기' }</Button>
      </Div>
    </Modal>
  )
}