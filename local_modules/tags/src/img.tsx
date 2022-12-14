import { useMemo } from "react"
import { Image, ImageErrorEventData, ImageLoadEventData, ImageSourcePropType, ImageStyle, NativeSyntheticEvent, View } from "react-native"
interface TagImageStyle extends Omit<ImageStyle, 'display'|'resizeMode'> {
  display?: 'flex' | 'inline-flex' | 'none',
  objectFit?: "contain" | "cover"
}

interface ImgProps {
  src: ImageSourcePropType | string,
  style?: TagImageStyle,
  onError?: ((error: NativeSyntheticEvent<ImageErrorEventData>) => void),
  onLoad?: ((event: NativeSyntheticEvent<ImageLoadEventData>) => void)
}

export const Img = ({ src, style, ...rest }:ImgProps) => {

  const source = useMemo(() => getSource({ src }), [src]);
  const { display, objectFit, ...etcStyle } = style || {};

  return (
    source 
    ?
      <Image 
        {...rest}
        resizeMode={style?.objectFit || 'contain'}
        source={source} 
        style={{
          ...etcStyle,
          resizeMode: objectFit || 'contain',
          display: display === 'inline-flex' ? 'flex' : display
        }}/>
    :
      <View 
        style={{ 
          ...etcStyle, 
          display: display === 'inline-flex' ? 'flex' : display 
        }}></View>
  )
}

const getSource = ({ src }:{ src:ImageSourcePropType | string }) => {
  if(typeof src === 'string') {
    return { uri: src };
  }
  else {
    return src;
  }
}