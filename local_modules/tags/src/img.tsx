import { Image, ImageSourcePropType, ImageStyle } from "react-native"

interface ImgProps {
  src: ImageSourcePropType | string,
  style?: ImageStyle,
  resizeMode?: "contain" | "cover"
}

export const Img = ({ src, style, resizeMode = 'contain' }:ImgProps) => {
  const source = typeof src === 'string'
    ? 
      { uri: src }
    : 
      src;
  return (
    <Image resizeMode={resizeMode} source={source} style={{ resizeMode, ...style }}></Image>
  )
}