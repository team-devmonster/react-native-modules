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

  const { display, objectFit, ...etcStyle } = style || {};

  return (
    <Image 
      resizeMode={style?.objectFit || 'contain'}
      source={source} 
      style={{
        ...etcStyle,
        resizeMode: objectFit || 'contain',
        display: display === 'inline-flex' ? 'flex' : display
      }}/>
  )
}