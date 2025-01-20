import { P, TagContext, TagStyle } from "@team-devmonster/react-native-tags"
import Animated, { FadeInDown, FadeInUp, FadeOutDown, FadeOutUp } from "react-native-reanimated"
import { SafeAreaInsetsContext } from "react-native-safe-area-context"
import { useModal } from "./core"

export type ToastProps = {
  message:string,
  duration?:number,
  position?:'top'|'bottom',
  style?:TagStyle,
  contentStyle?:TagStyle
}
export type ToastReturn = {
  close:() => void
}

export const useToast = () => {

  const { createModal } = useModal();

  const Toast = ({ message, duration = 3000, position = 'bottom', style, contentStyle }:ToastProps):ToastReturn => {

    let isFirst = true;
  
    const $modal = createModal({
      visible: true,
      type: 'children',
      backButtonClose: false,
      onRequestClose: () => {
        $modal.remove();
      },
      children: (
        <TagContext.Consumer>
          {({ tagConfig }) => {
            const toastConfig = tagConfig?.toast;
            
            // config에서 다 설정 할 수 있다.
            if(isFirst) {
              isFirst = false;
              setTimeout(() => {
                $modal.remove();
              }, duration || toastConfig?.duration);
            }
  
            return (
              <SafeAreaInsetsContext.Consumer>
                {(insets) => {
                  const positionStyle = {} as TagStyle;
                  const tostPosition = position || toastConfig?.position;
                  if(tostPosition === 'top') positionStyle.top = 50 + (insets?.top || 0);
                  else if(tostPosition === 'bottom') positionStyle.bottom = 50 + (insets?.bottom || 0);
  
                  return (
                    <Animated.View
                      entering={position === 'top' ? FadeInUp : FadeInDown}
                      exiting={position === 'top' ? FadeOutUp : FadeOutDown}
                      style={{ 
                        position: 'absolute',
                        width: '100%',
                        alignItems: 'center',
                        zIndex: 1001,
                        ...positionStyle,
                        ...toastConfig?.style,
                        ...style as any
                      }}
                    >
                      <P style={{
                        backgroundColor: '#dedede',
                        padding: 8,
                        borderRadius: 15,
                        color: '#000000',
                        fontSize: 12,
                        ...toastConfig?.contentStyle,
                        ...contentStyle
                      }}>
                        { message || toastConfig?.message }
                      </P>
                    </Animated.View>
                  )
                }}
              </SafeAreaInsetsContext.Consumer>
            )
          }}
        </TagContext.Consumer>
      )
    })
  
    return {
      close: () => {
        $modal.remove();
      }
    }
  }

  return { Toast };
}