import { Ref, forwardRef, useMemo } from "react"
import { Image, ImageErrorEventData, ImageLoadEventData, ImageProps, ImageSourcePropType, ImageStyle, NativeSyntheticEvent, View } from "react-native"
import { useCreateStyle } from "./useCreateStyle"
interface TagImageStyle extends Omit<ImageStyle, 'display'|'resizeMode'> {
  display?: 'flex' | 'inline-flex' | 'none',
  objectFit?: "contain" | "cover"
}

interface ImgProps extends Omit<ImageProps, 'style'|'src'|'source'> {
  alt?:string,
  src: ImageSourcePropType | string,
  style?: TagImageStyle,
  onError?: ((error: NativeSyntheticEvent<ImageErrorEventData>) => void),
  onLoad?: ((event: NativeSyntheticEvent<ImageLoadEventData>) => void)
}

export const Img = forwardRef(({ src, style, alt, ...rest }:ImgProps, ref:Ref<Image>) => {
  const source = useMemo(() => getSource({ src }), [src]);
  const { display, objectFit, ...etcStyle } = style || {};

  const { imgStyle, viewStyle } = useCreateStyle(({
    imgStyle: {
      ...etcStyle,
      resizeMode: objectFit || 'contain',
      display: display === 'inline-flex' ? 'flex' : display
    },
    viewStyle: {
      ...etcStyle,
      display: display === 'inline-flex' ? 'flex' : display 
    }
  }), [style]);

  return (
    source 
    ?
      <Image 
        ref={ref}
        {...rest}
        resizeMode={style?.objectFit || 'contain'}
        accessible={true}
        accessibilityLabel={alt}
        source={source} 
        style={imgStyle}/>
    :
      <View style={viewStyle}></View>
  )
});

const getSource = ({ src }:{ src:ImageSourcePropType | string }) => {
  if(typeof src === 'string') {
    return { uri: src };
  }
  else {
    return src;
  }
}