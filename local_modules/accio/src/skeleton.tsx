import React, { useEffect, useState, useMemo } from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import { SkeletonItem } from "./skeletonItem";

export const Skeleton = ({ style, children }:ViewProps) => {

  const flattenStyle = useMemo(() => StyleSheet.flatten(style), [style]);

  const [skeletonWidth, setSkeletonWidth] = useState(0);
  const step = useSharedValue(-1);
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: step.value * skeletonWidth }]
    }
  })
  useEffect(() => {
    if(skeletonWidth) {
      step.value = withRepeat(withTiming(1, { duration: 1500 }), -1, false);
    }
  }, [skeletonWidth])

  return (
    children ?
      <View 
        style={{ ...flattenStyle, opacity: 0.1 }}
        onLayout={(e) => {
          const { width } = e.nativeEvent.layout;
          setSkeletonWidth(width);
        }}
      >
        {
          children
        }
        <MaskedView
          style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
          maskElement={
            <View
              style={{
                backgroundColor: 'transparent',
                width: '100%',
                height: '100%',
                ...flattenStyle
              }}
            >
              {
                children
              }
            </View>
          }
        >
          <View style={{ width: '100%', height: '100%', backgroundColor: '#7e7e7e' }} />
          <Animated.View style={[{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2 }, animatedStyle]}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={['#7e7e7e', '#ffffff', '#7e7e7e']} 
              style={{ width: '100%', height: '100%', backgroundColor: '#324376' }}
            />
          </Animated.View>
        </MaskedView>
      </View>
    : 
    <View 
      style={[style, { opacity: 0.1 }]}
      onLayout={(e) => {
        const { width } = e.nativeEvent.layout;
        setSkeletonWidth(width);
      }}
    >
      <SkeletonItem style={{ width: '100%', height: '100%', borderRadius: 20 }}/>
      <MaskedView
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
        maskElement={
          <View
            style={{
              backgroundColor: 'transparent',
              width: '100%',
              height: '100%'
            }}
          >
            <SkeletonItem style={{ width: '100%', height: '100%', borderRadius: flattenStyle?.borderRadius }}/>
          </View>
        }
      >
        <View style={{ width: '100%', height: '100%', backgroundColor: '#7e7e7e' }} />
        <Animated.View style={[{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 2 }, animatedStyle]}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#7e7e7e', '#ffffff', '#7e7e7e']} 
            style={{ width: '100%', height: '100%', backgroundColor: '#324376' }}
          />
        </Animated.View>
      </MaskedView>
    </View>
  )
}