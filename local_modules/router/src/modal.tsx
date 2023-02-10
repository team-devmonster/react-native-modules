import { Button, Div, TagElement, TagStyle } from "@team-devmonster/react-native-tags";
import React, { createContext, Dispatch, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, StyleSheet, useColorScheme, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeIn, FadeInDown, FadeOut, FadeOutDown, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

export type ModalProps = {
  entering?:any,
  visible?:boolean,
  onRequestClose?:(e?:any) => void,
  type?:'fullScreen'|'handleScreen'|'center'|'clear',
  style?:TagStyle,
  contentStyle?:TagStyle,
  backDropStyle?:TagStyle,
  renderHandle?:() => TagElement,
  handleStyle?:TagStyle,
  children?:any
}

type ModalsProps = { 
  [key:string]:ModalProps
};
const RouterContext = createContext<{ modals:ModalsProps, setModals:Dispatch<ModalsProps>, modalsRef:React.MutableRefObject<ModalsProps> }>({} as any);

export const RouterProvider = ({children}:{children:React.ReactNode}) => {

  const [modals, setModals] = useState<ModalsProps>({});
  const modalsRef = useRef<ModalsProps>({});

  return (
    <RouterContext.Provider value={{ modals, setModals, modalsRef }}>
      {children}
      {Object.entries(modals).map(([key, props]) => {
        return (
          <ModalContent key={key} {...props}></ModalContent>
        )
      })}
    </RouterContext.Provider>
  )
}


export const Modal = (props:ModalProps) => {

  const { setModals, modalsRef } = useContext(RouterContext);
  
  const key = useMemo(() => String(new Date().getTime()) + 'M' + Object.keys(modalsRef.current).length, []);

  useMemo(() => {
    modalsRef.current = {
      ...modalsRef.current,
      [key]: props
    }
  }, [props]);

  useEffect(() => {
    return () => {
      delete modalsRef.current[key];
      setModals(modalsRef.current);
    }
  }, [])

  useEffect(() => {
    setModals(modalsRef.current);
  }, [props]);

  return null;
}

const ModalContent = ({ visible, type, children, onRequestClose, style, backDropStyle, contentStyle, handleStyle }:ModalProps) => {

  const safe = useSafeAreaInsets();
  const { height } = Dimensions.get('window');

  const colorScheme = useColorScheme();
  const defaultContentBackgroundColor = useMemo(() => colorScheme === 'light' ? 'white' : 'black', [colorScheme]);

  const handlePosition = useSharedValue(height/3);
  const handleTransition = useSharedValue(height/3);
  const handleAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: handleTransition.value }]
    }
  });
  const panGesture = useMemo(() => Gesture.Pan()
  .onUpdate((e) => {
    handleTransition.value = handlePosition.value + e.translationY;
  })
  .onEnd((e) => {
    if(handleTransition.value > height*2/3) {
      onRequestClose?.();
    }
    if(handleTransition.value < safe.top + 20) {
      handleTransition.value = withTiming(safe.top);
      handlePosition.value = withTiming(safe.top);
    }
    handlePosition.value = handleTransition.value;
  })
  .runOnJS(true), []);


  if(!visible) return null;

  switch(type) {
    case 'fullScreen':
      return (
        <Animated.View style={{ ...StyleSheet.absoluteFillObject, ...style as any }}>
          <Animated.View entering={FadeIn} exiting={FadeOut} style={{ ...StyleSheet.absoluteFillObject }}>
            <Button color={'#000000'} fill="none" style={{ ...StyleSheet.absoluteFillObject, borderRadius: 0, opacity: 0.3, ...backDropStyle }} onClick={onRequestClose}></Button>
          </Animated.View>
          <Animated.View 
            entering={FadeInDown}
            exiting={FadeOutDown}
            style={{ 
              ...StyleSheet.absoluteFillObject, 
              backgroundColor: defaultContentBackgroundColor, 
              paddingTop: safe.top, 
              ...contentStyle as any 
            }}>
            { children }
          </Animated.View>
        </Animated.View>
      )
    case 'handleScreen':
      return (
        <View style={{ ...StyleSheet.absoluteFillObject, paddingTop: safe.top, ...style as any }}>
          <Animated.View entering={FadeIn} style={{ ...StyleSheet.absoluteFillObject }}>
            <Button color={'#000000'} fill="none" style={{ ...StyleSheet.absoluteFillObject, borderRadius: 0, opacity: 0.3, ...backDropStyle }} onClick={onRequestClose}></Button>
          </Animated.View>
          <Animated.View style={[{ ...StyleSheet.absoluteFillObject }, handleAnimation]}>
            <Animated.View 
              entering={FadeInDown} 
              style={{ 
                flex: 1,
                backgroundColor: defaultContentBackgroundColor,
                ...contentStyle as any
              }}>
              <GestureDetector gesture={panGesture}>
                <View 
                  style={{ 
                    padding: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...handleStyle as any
                  }}
                >
                  <View style={{ width: 60, height: 4, backgroundColor: '#e1e1e1' }}></View>
                </View>
              </GestureDetector>
              { children }
            </Animated.View>
          </Animated.View>
        </View>
      )
    case 'center':
      return (
        <Div style={{ ...StyleSheet.absoluteFillObject, paddingTop: safe.top, ...style }}>
          <Button color={'#000000'} fill="none" style={{ ...StyleSheet.absoluteFillObject, borderRadius: 0, opacity: 0.3, ...backDropStyle }} onClick={onRequestClose}></Button>
          { children }
        </Div>
      )
    case 'clear':
      return (
        children
      )
    default:
      return (
        children
      )
  }
}