import { Image, ImageSourcePropType, ImageStyle } from "react-native"

interface TagImageStyle extends Omit<ImageStyle, 'display'> {
  display?: 'flex' | 'inline-flex' | 'none'
}

interface ImgProps {
  src: ImageSourcePropType | string,
  style?: TagImageStyle,
  resizeMode?: "contain" | "cover"
}

export const Img = ({ src, style, resizeMode = 'contain' }:ImgProps) => {
  const source = typeof src === 'string'
    ? 
      { uri: src }
    : 
      src;
  return (
    <Image resizeMode={resizeMode} source={source} style={{ 
      resizeMode, 
      ...style,
      display: style?.display === 'inline-flex' ? 'flex' : style?.display
    }}></Image>
  )
}