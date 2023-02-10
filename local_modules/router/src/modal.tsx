import { Button, Div, TagElement, TagStyle } from "@team-devmonster/react-native-tags";
import React, { createContext, Dispatch, useContext, useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, StyleSheet, useColorScheme, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeIn, FadeInDown, FadeOut, FadeOutDown, SlideOutDown, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
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
      {/* 정말 이유는 모르겠지만, 마지막에 이놈 View를 넣어주어야 exit 애니메이션이 작동한다..... 왜지...? */}
      <View></View>
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
    if(handleTransition.value > height/2) {
      onRequestClose?.();
      handleTransition.value = withTiming(height/3);
      handlePosition.value = withTiming(height/3);
    }
    else if(handleTransition.value > height/6) {
      handleTransition.value = withTiming(height/3);
      handlePosition.value = withTiming(height/3);
    }
    else {
      handleTransition.value = withTiming(safe.top);
      handlePosition.value = withTiming(safe.top);
    }
  })
  .runOnJS(true), []);


  if(!visible) return null;

  switch(type) {
    case 'fullScreen':
      return (
        <View style={{ ...StyleSheet.absoluteFillObject, ...style as any }}>
          <BackDrop backDropStyle={backDropStyle} onRequestClose={onRequestClose}/>
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
        </View>
      )
    case 'handleScreen':
      return (
        <GestureDetector gesture={panGesture}>
          <View style={{ ...StyleSheet.absoluteFillObject, paddingTop: safe.top, ...style as any }}>
            <BackDrop backDropStyle={backDropStyle} onRequestClose={onRequestClose}/>
            <Animated.View style={[{ ...StyleSheet.absoluteFillObject }, handleAnimation]}>
              <Animated.View 
                entering={FadeInDown} 
                exiting={SlideOutDown}
                style={{ 
                  flex: 1,
                  backgroundColor: defaultContentBackgroundColor,
                  ...contentStyle as any
                }}>
                
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
                { children }
              </Animated.View>
            </Animated.View>
          </View>
        </GestureDetector>
      )
    case 'center':
      return (
        <Div style={{ ...StyleSheet.absoluteFillObject, paddingTop: safe.top, alignItems: 'center', justifyContent: 'center', ...style }}>
          <BackDrop backDropStyle={backDropStyle} onRequestClose={onRequestClose}/>
          <Animated.View 
            entering={FadeInDown}
            exiting={FadeOutDown}
            style={[{ backgroundColor: 'white', width: 280, height: 100, ...contentStyle as any }]}>
            { children }
          </Animated.View>
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

type BackDropProps = {
  backDropStyle?:TagStyle,
  onRequestClose:any
}
const BackDrop = ({ backDropStyle, onRequestClose }:BackDropProps) => {
  return (
    <Animated.View 
      entering={FadeIn} 
      exiting={FadeOut}
      style={{ ...StyleSheet.absoluteFillObject }}
    >
      <Button color={'#000000'} fill="none" style={{ ...StyleSheet.absoluteFillObject, borderRadius: 0, opacity: 0.3, ...backDropStyle }} onClick={onRequestClose}></Button>
    </Animated.View>
  )
}