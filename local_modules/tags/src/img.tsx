import { Image, ImageSourcePropType, ImageStyle } from "react-native"
interface TagImageStyle extends Omit<ImageStyle, 'display'|'resizeMode'> {
  display?: 'flex' | 'inline-flex' | 'none',
  objectFit?: "contain" | "cover"
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
      resizeMode={style?.objectFit || 'contain'}
      source={source} 
      style={{ 
        ...style,
        resizeMode: style?.objectFit || 'contain', 
        display: style?.display === 'inline-flex' ? 'flex' : style?.display
      }}/>
  )
}