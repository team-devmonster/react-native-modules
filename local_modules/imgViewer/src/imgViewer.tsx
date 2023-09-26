import { Button, ButtonStyle, Div, P, TagStyle } from "@team-devmonster/react-native-tags";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, ImageSourcePropType, Modal, StyleSheet } from "react-native";
import { GestureHandlerRootView, ScrollView } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ImgViewerItem } from "./imgViewerItem";

export type ImgViewerSrcType = string | ImageSourcePropType | (string | ImageSourcePropType)[];
export type ImgViewerProps = {
  src:ImgViewerSrcType,
  startIndex?:number,
  visible?:boolean, 
  onRequestClose?:() => void,
  closeText?:string,
  closeButtonContainerStyle?:TagStyle,
  closeButtonStyle?:ButtonStyle
}
export const ImgViewer = ({ src, startIndex = 0, visible, onRequestClose, closeText, closeButtonContainerStyle, closeButtonStyle }:ImgViewerProps) => {

  const scrollViewRef = useRef<ScrollView>(null);
  const safe = useSafeAreaInsets();

  const srcArr = useMemo(() => src ? Array.isArray(src) ? src : [src] : [], [src]);

  const [currentIndex, setCurrentIndex] = useState(startIndex); // State to track current index

  const handleScrollEnd = useCallback((event: any) => {
    const offset = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(offset / event.nativeEvent.layoutMeasurement.width);
    setCurrentIndex(newIndex);
  },[currentIndex]);

  useEffect(() => {
    if(visible) {
      setCurrentIndex(startIndex);
    }
  }, [visible]);

  return (
    <Modal 
      visible={visible}
      onRequestClose={onRequestClose}
      transparent={true}
      animationType="fade"
    >
      <Div
        style={style.backdrop}
      ></Div>
      <GestureHandlerRootView style={style.full}>
        {
          srcArr.length > 1 ?
          <ScrollView 
            ref={scrollViewRef}
            horizontal={true} 
            pagingEnabled={true} 
            showsHorizontalScrollIndicator={false} 
            showsVerticalScrollIndicator={false}
            onLayout={() => {
              scrollViewRef.current?.scrollTo({
                x: startIndex * Dimensions.get("window").width,
                animated: false
              });
            }}
            onMomentumScrollEnd={handleScrollEnd} // Handle scroll end
            style={style.full}>
            {
              srcArr?.map((src,index) => (
                <ImgViewerItem key={index} src={src}/>
              ))
            }
          </ScrollView>
          : 
          srcArr.length === 1 ?
          <ImgViewerItem src={srcArr[0]}/>
          : null
        }
      </GestureHandlerRootView>
      
      {
        srcArr.length > 1 ?
        <Div style={style.pageContainer}>
          <P style={style.page}>{`${currentIndex + 1}/${srcArr?.length}`}</P>
        </Div>
        : null
      }

      <Div style={{ backgroundColor: closeButtonStyle?.backgroundColor, paddingBottom: safe.bottom, ...closeButtonContainerStyle }}>
        <Button 
          onClick={onRequestClose}
          color={closeButtonStyle?.backgroundColor || '#FF6420' as any}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            ...closeButtonStyle
        }}>{ closeText || '닫기' }</Button>
      </Div>
    </Modal>
  )
}

const style = StyleSheet.create({
  backdrop: { backgroundColor: '#000000', opacity: 0.3, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' },
  full: { flex: 1 },
  pageContainer: { alignItems: 'center', marginBottom: 5 },
  page: { textAlign: 'center', color: 'white', backgroundColor: '#666666', padding: 10, borderRadius: 20 }
});