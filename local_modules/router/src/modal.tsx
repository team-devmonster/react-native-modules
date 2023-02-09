import { Button, Div, TagStyle } from "@team-devmonster/react-native-tags";
import React, { createContext, Dispatch, useContext, useEffect, useMemo, useRef, useState } from "react";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type ModalProps = {
  animationType?:any,
  visible?:boolean,
  onRequestClose?:(e?:any) => void,
  fullScreen?:boolean,
  style?:TagStyle,
  backDropStyle?:TagStyle,
  children?:any
}

type ModalsProps = { 
  [key:string]:ModalProps
};
const RouterContext = createContext<{ modals:ModalsProps, setModals:Dispatch<ModalsProps>, modalsRef:React.MutableRefObject<ModalsProps> }>({} as any);

export const RouterProvider = ({children}:{children:React.ReactNode}) => {

  const [modals, setModals] = useState<ModalsProps>({});
  const modalsRef = useRef<ModalsProps>({});

  return (
    <RouterContext.Provider value={{ modals, setModals, modalsRef }}>
      {children}
      {Object.entries(modals).map(([key, props]) => {
        console.log('update', key, props);
        return (
          <ModalContent key={key} {...props}></ModalContent>
        )
      })}
    </RouterContext.Provider>
  )
}


export const Modal = (props:ModalProps) => {

  const { setModals, modalsRef } = useContext(RouterContext);
  
  const key = useMemo(() => String(new Date().getTime()) + 'M' + Object.keys(modalsRef.current).length, []);

  useMemo(() => {
    modalsRef.current = {
      ...modalsRef.current,
      [key]: props
    }
  }, [props]);

  useEffect(() => {
    return () => {
      delete modalsRef.current[key];
      setModals(modalsRef.current);
      console.log('remove Effect ', modalsRef.current);
    }
  }, [])

  useEffect(() => {
    setModals(modalsRef.current);
  }, [props]);

  return null;
}

const ModalContent = ({ visible, fullScreen, children, onRequestClose, style, backDropStyle }:ModalProps) => {

  const safe = useSafeAreaInsets();

  if(fullScreen) {
    return (
      visible ?
        <Div style={{ ...StyleSheet.absoluteFillObject, paddingTop: safe.top, ...style }}>
          <Button color={'#000000'} fill="none" style={{ ...StyleSheet.absoluteFillObject, borderRadius: 0, opacity: 0.3, ...backDropStyle }} onClick={onRequestClose}></Button>
          { children }
        </Div>
      : null
    )
  }
  else {
    return visible ? children : null;
  }
}