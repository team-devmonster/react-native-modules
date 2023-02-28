import { TagElement, TagStyle } from "@team-devmonster/react-native-tags";
import React, { createContext, Dispatch, useEffect, useMemo, useRef, useState } from "react";
import { BackHandler, Dimensions, Pressable, StyleSheet, useColorScheme, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeIn, FadeInDown, FadeOut, FadeOutDown, SlideOutDown, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

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
export const RouterContext = createContext<{ modals:ModalsProps, setModals:Dispatch<ModalsProps>, modalsRef:React.MutableRefObject<ModalsProps> } | any>({} as any);

// context 말고 그냥 전역변수 지정하니까 무한 버블링 문제가 사라진다... 뭘까 이건... 거지 같네?
// 그럼 context는 왜 쓰는거지? 이건 뭐지?? 대체??
const modalVariables = {
  modals:null as any,
  setModals:null as any,
  modalsRef:{ current: null as any }
}
export const RouterProvider = ({children}:{children:React.ReactNode}) => {

  const [modals, setModals] = useState<ModalsProps>({});
  const modalsRef = useRef<ModalsProps>({});
  modalVariables.modals = modals;
  modalVariables.setModals = setModals;
  modalVariables.modalsRef = modalsRef;

  return (
    <>
      {children}
      {Object.entries(modals).map(([key, {visible, ...rest}]) => {
        return (
          visible ?
            <ModalContent key={key} {...rest}></ModalContent>
          : null
        )
      })}
      {/* 정말 이유는 모르겠지만, 마지막에 이놈 View를 넣어주어야 exit 애니메이션이 작동한다..... 왜지...? */}
      <View></View>
    </>
  )
}

export const Modal = (props:ModalProps) => {
  const { setModals, modalsRef } = modalVariables;
  
  const key = useMemo(() => String(new Date().getTime()) + 'M' + Object.keys(modalsRef.current).length, []);

  useEffect(() => {
    return () => {
      delete modalsRef.current[key];
      setModals(modalsRef.current);
    }
  }, [])

  useMemo(() => {
    modalsRef.current[key] = props;
  }, [props]);
  
  useEffect(() => {
    setModals({...modalsRef.current});
  }, [props]);

  return null;
}
export const createModal = (props:ModalProps) => {
  const { setModals, modalsRef } = modalVariables;

  const key = String(new Date().getTime()) + 'M' + Object.keys(modalsRef.current).length;

  modalsRef.current[key] = props;
  setModals({...modalsRef.current});

  return {
    remove: () => {
      delete modalsRef.current[key];
      setModals(modalsRef.current);
    }
  }
}

export const ModalContent = ({ type = 'fullScreen', children, onRequestClose, style, backDropStyle, contentStyle, handleStyle }:ModalProps) => {

  const navigation = useNavigation();

  const safe = useSafeAreaInsets();
  const { height } = Dimensions.get('window');
  const contentHeight = (contentStyle?.height as number) || height/2*3;
  const contentTop = height - contentHeight;

  const colorScheme = useColorScheme();
  const defaultContentBackgroundColor = useMemo(() => colorScheme === 'light' ? 'white' : 'black', [colorScheme]);

  const handlePosition = useSharedValue(contentTop);
  const handleTransition = useSharedValue(contentTop);
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
    if(handleTransition.value > contentTop + contentHeight/3) {
      onRequestClose?.();
      handleTransition.value = withTiming(contentTop);
      handlePosition.value = withTiming(contentTop);
    }
    else if(handleTransition.value > height/6) {
      handleTransition.value = withTiming(contentTop);
      handlePosition.value = withTiming(contentTop);
    }
    else {
      handleTransition.value = withTiming(safe.top);
      handlePosition.value = withTiming(safe.top);
    }
  })
  .runOnJS(true), []);

  
  useEffect(() => {
    const $BackButtonSubs = BackHandler.addEventListener('hardwareBackPress', function () {
      onRequestClose?.();
      return true;
    });
    return () => {
      $BackButtonSubs.remove();
    }
  }, [navigation]);

  switch(type) {
    case 'fullScreen':
      return (
        <View style={[styles.container, style as any]}>
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
          <View style={[styles.container, { paddingTop: safe.top }, style as any]}>
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
        <View style={[styles.container, { paddingTop: safe.top, alignItems: 'center', justifyContent: 'center' }, style as any]}>
          <BackDrop backDropStyle={backDropStyle} onRequestClose={onRequestClose}/>
          <Animated.View 
            entering={FadeInDown}
            exiting={FadeOutDown}
            style={contentStyle as any}>
            { children }
          </Animated.View>
        </View>
      )
    case 'clear':
      return (
        <View style={[{ position: 'absolute' }, style as any]}>
          {children}
        </View>
      )
    default:
      return (
        <View style={[{ position: 'absolute' }, style as any]}>
          {children}
        </View>
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
      <Pressable onPress={onRequestClose} style={[styles.backDropStyle, backDropStyle as any]}></Pressable>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject, 
    zIndex: 1000
  },
  backDropStyle: {
    ...StyleSheet.absoluteFillObject, 
    width: '100%', 
    height: '100%', 
    borderRadius: 0,
    backgroundColor: '#000000',
    opacity: 0.3
  }
})