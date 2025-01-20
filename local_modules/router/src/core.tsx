import { TagElement, TagStyle } from "@team-devmonster/react-native-tags";
import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import { BackHandler, Dimensions, Pressable, ScrollView, StyleSheet, useColorScheme, View, Modal as NativeModal } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Animated, { FadeIn, FadeInDown, FadeOut, FadeOutDown, SlideOutDown, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export type ModalProps = {
  entering?:any,
  exiting?:any,
  visible?:boolean,
  backButtonClose?:boolean,
  onRequestClose?:(e?:any) => void,
  type?:'fullScreen'|'handleScreen'|'center'|'clear'|'children',
  options?:{ canFullScreen?:boolean },
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
//export const RouterContext = createContext<{ layoutScrollRef:React.RefObject<ScrollView|null> }>({ layoutScrollRef: { current: null } });
export const RouterContext = createContext<{ 
  layoutScrollRef?:any,
  modals: ModalsProps,
  setModals: React.Dispatch<React.SetStateAction<ModalsProps>>,
  modalsRef: { current: ModalsProps },
  createModal: (props:ModalProps) => { remove: () => void }
  // modalsChanging: { [key:string]: boolean }
}>({} as any);

// context 말고 그냥 전역변수 지정하니까 무한 버블링 문제가 사라진다... 뭘까 이건... 거지 같네?
// 이거 근데 왜 되는거지...?
// 앞에 theme 이랑 tags 에서는 아무런 문제가 안생겼는데, 왜 여기서만 문제가 생기는걸까?
// 함수형으로 쓰고 싶기떄문에. context를 쓸 수가 없네... 더 좋은 방법이 없을까?
/* type ModalVariablesType = {
  modals: ModalsProps,
  setModals: React.Dispatch<React.SetStateAction<ModalsProps>>,
  modalsRef: { current: ModalsProps },
  modalsChanging: { [key:string]: boolean }
} */
/* const modalVariables:ModalVariablesType = {
  modals: {} as ModalsProps,
  setModals: null as any,
  modalsRef: { current: {} as  ModalsProps },
  modalsChanging: {} as { [key:string]: boolean }
} */
export const RouterProvider = ({children}:{children:React.ReactNode}) => {

  const [modals, setModals] = useState<ModalsProps>({});
  const modalsRef = useRef<ModalsProps>({});

  const layoutScrollRef = useRef<ScrollView|null>(null);

  const createModal = (props:ModalProps) => {
    const key = String(new Date().getTime()) + 'M' + Object.keys(modalsRef.current).length;
  
    modalsRef.current[key] = props;
    setModals({...modalsRef.current});
  
    return {
      remove: () => {
        if(modalsRef.current[key]) {
          delete modalsRef.current[key];
          setModals({...modalsRef.current});
        }
      }
    }
  }

  return (
    <RouterContext.Provider value={{ layoutScrollRef, modals, setModals, modalsRef, createModal /* modalsChanging: {} */ }}>
      {children}
      <ModalLayout modals={modals}/>
      {/* 정말 이유는 모르겠지만, 마지막에 이놈 View를 넣어주어야 exit 애니메이션이 작동한다..... 왜지...? */}
      <View></View>
    </RouterContext.Provider>
  )
}

const ModalLayout = ({ modals }:ModalsProps) => {
  return (
    <>
      {
        Object.entries(modals).map(([key, {visible, ...rest}]) => {
          return (
            visible ?
              <ModalContent key={key} {...rest}></ModalContent>
            : null
          )
        })
      }
    </>
  )
}

export const Modal = (props:ModalProps) => {
  return (
    <NativeModal 
      visible={props.visible} 
      transparent={true}
      animationType={'none'}
    >
      {
        props.visible ?
        <ModalContent {...props}></ModalContent>
        : null
      }
    </NativeModal>
  )
}
/* export const createModal = (props:ModalProps) => {
  const { setModals, modalsRef } = useContext(RouterContext);

  const key = String(new Date().getTime()) + 'M' + Object.keys(modalsRef.current).length;

  modalsRef.current[key] = props;
  setModals({...modalsRef.current});

  return {
    remove: () => {
      if(modalsRef.current[key]) {
        delete modalsRef.current[key];
        setModals({...modalsRef.current});
      }
    }
  }
} */

  export const useModal = () => {
    const context = useContext(RouterContext)
    if (!context) {
      throw new Error('useModal must be used within a ModalProvider')
    }
    return context
  }

export const ModalContent = ({ 
  type = 'fullScreen', 
  options,
  entering, 
  exiting, 
  children, 
  onRequestClose, 
  style, 
  backDropStyle, 
  contentStyle, 
  handleStyle, 
  backButtonClose = true 
}:ModalProps) => {

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
    const position = handlePosition.value + e.translationY;
    if(options?.canFullScreen) {
      handleTransition.value = position;
    }
    else {
      handleTransition.value = position < contentTop ? contentTop : position;
    }
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
      if(options?.canFullScreen) {
        handleTransition.value = withTiming(safe.top);
        handlePosition.value = withTiming(safe.top);
      }
      else {
        handleTransition.value = withTiming(contentTop);
        handlePosition.value = withTiming(contentTop);
      }
    }
  })
  .runOnJS(true), []);

  
  useEffect(() => {
    if(backButtonClose) {
      const $BackButtonSubs = BackHandler.addEventListener('hardwareBackPress', function () {
        onRequestClose?.();
        return true;
      });
      return () => {
        $BackButtonSubs.remove();
      }
    }
  }, [navigation]);

  switch(type) {
    case 'fullScreen':
      return (
        <View style={[styles.container, style as any]}>
          <BackDrop backDropStyle={backDropStyle} onRequestClose={onRequestClose}/>
          <Animated.View 
            entering={entering || FadeInDown}
            exiting={exiting || FadeOutDown}
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
                entering={entering || FadeInDown} 
                exiting={exiting || SlideOutDown}
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
                    <View style={{ width: 60, height: 4, borderRadius: 4, backgroundColor: '#e1e1e1' }}></View>
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
            entering={entering || FadeInDown}
            exiting={exiting || FadeOutDown}
            style={contentStyle as any}>
            { children }
          </Animated.View>
        </View>
      )
    case 'clear':
      return (
        <View style={[{ position: 'absolute', zIndex: 1000 }, style as any]}>
          <Animated.View 
            entering={entering || FadeInDown}
            exiting={exiting || FadeOutDown}
            style={contentStyle as any}>
            { children }
          </Animated.View>
        </View>
      )
    case 'children':
      return children;
    default:
      return (
        <View style={[{ position: 'absolute', zIndex: 1000 }, style as any]}>
          <Animated.View 
            entering={entering || FadeInDown}
            exiting={exiting || FadeOutDown}
            style={contentStyle as any}>
            { children }
          </Animated.View>
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