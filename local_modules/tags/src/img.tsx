import { Image, ImageSourcePropType, ImageStyle } from "react-native"
interface TagImageStyle extends Omit<ImageStyle, 'display'|'resizeMode'> {
  display?: 'flex' | 'inline-flex' | 'none'
}

interface ImgProps {
  src: ImageSourcePropType | string,
  style?: TagImageStyle,
  objectFit?: "contain" | "cover"
}

export const Img = ({ src, style, objectFit = 'contain' }:ImgProps) => {
  const source = typeof src === 'string'
    ? 
      { uri: src }
    : 
      src;
  return (
    <Image 
      resizeMode={objectFit} 
      source={source} 
      style={{ 
        ...style,
        resizeMode: objectFit, 
        display: style?.display === 'inline-flex' ? 'flex' : style?.display
      }}/>
  )
}