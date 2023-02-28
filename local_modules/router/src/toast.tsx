import { Div, P, TagContext, TagStyle } from "@team-devmonster/react-native-tags"
import Animated, { FadeInDown, FadeInUp, FadeOutDown, FadeOutUp } from "react-native-reanimated"
import { SafeAreaInsetsContext } from "react-native-safe-area-context"
import { createModal } from "./modal"

export type ToastProps = {
  message:string,
  duration?:number,
  position?:'top'|'bottom',
  style?:TagStyle,
  contentStyle?:TagStyle
}
export const Toast = ({ message, duration = 3000, position = 'bottom', style, contentStyle }:ToastProps) => {

  let isFirst = true;

  const $modal = createModal({
    visible: true,
    type: 'children',
    onRequestClose: () => {
      $modal.remove();
    },
    children: (
      <Animated.View 
        entering={position === 'top' ? FadeInUp : FadeInDown}
        exiting={position === 'top' ? FadeOutUp : FadeOutDown}
      >
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
                    <Div
                      style={{ 
                        position: 'absolute',
                        width: '100%',
                        alignItems: 'center',
                        ...positionStyle,
                        ...toastConfig?.style,
                        ...style 
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
                    </Div>
                  )
                }}
              </SafeAreaInsetsContext.Consumer>
            )
          }}
        </TagContext.Consumer>
      </Animated.View>
    )
  })
  
}