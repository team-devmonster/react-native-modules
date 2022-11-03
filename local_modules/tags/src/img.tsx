import { Image, ImageSourcePropType, ImageStyle } from "react-native"
interface TagImageStyle extends Omit<ImageStyle, 'display'> {
  display?: 'flex' | 'inline-flex' | 'none'
}

interface ImgProps {
  src: ImageSourcePropType | string,
  style?: TagImageStyle
}

export const Img = ({ src, style }:ImgProps) => {
  const source = typeof src === 'string'
    ? 
      { uri: src }
    : 
      src;
  return (
    <Image 
      resizeMode={style?.resizeMode || 'contain'} 
      source={source} 
      style={{
        resizeMode: style?.resizeMode || 'contain',
        ...style,
        display: style?.display === 'inline-flex' ? 'flex' : style?.display
      }}/>
  )
}