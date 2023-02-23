import React, { Children, createContext, useContext, useMemo } from "react";
import { Text, TextStyle } from "react-native";
import { TagElement, TagGroupConfig, TagProps, TagStyle } from "./type";



export const TagContext = createContext<{ tagConfig?:TagGroupConfig }>({});

export function TagProvider({children, tagConfig}:{children:React.ReactNode, tagConfig?:TagGroupConfig}) {

  //useFonts

  return (
    <TagContext.Provider value={{ tagConfig }}>
      {children}
    </TagContext.Provider>
  )
}

export function useTags() {
  return useContext(TagContext);
}

export const textPattern = /^(color|font|text|lineHeight|whiteSpace)/;
export const layoutPattern = /^(display|width|minWidth|maxWidth|height|minHeight|maxHeight|position|top|left|right|bottom|opacity|overflow|alignSelf|justifySelf|aspectRatio|flex)$/;
export const shadowPattern = /^(shadow|elevation)/;
export const borderPattern = /^(border)/;
export const marginPattern = /^(margin)/;
export const placeholderPattern = /^(placeholder)/;
export const gapPattern = /(gap|Gap)/;
export const iconPattern = /(^icon)/;

export const useTagStyle = (patterns:RegExp[], styleStates:(TagStyle|undefined)[]):any[] => {
  /* 이건 그냥 state바뀌면 무한 갱신함. 무언가 방법이 필요함 */
  // 아 뭔가... 스타일 뭔가 더 개선할 수 있을 것 같은데...
  const styles = useMemo(() => makeTagStyle({ patterns, styleStates }), styleStates);
  return styles;
}
const makeTagStyle = ({ patterns, styleStates }: { patterns:RegExp[], styleStates:(TagStyle|undefined)[] }) => {
  // case 1
  let styleObj = {};
  styleStates.forEach(styleState => styleObj = Object.assign(styleObj, styleState));
  if(!patterns.length) return [styleObj];


  // case 2
  const entries = Object.entries(styleObj) as [keyof TagStyle, any][];
  const styles:TagStyle[] = new Array(patterns.length+1).fill(null).map(() => ({}));

  for(let i = 0; i < entries.length; i++) {
    const key = entries[i][0];
    const value = entries[i][1];

    for(let j = 0; j < patterns.length; j++) {
      const pattern = patterns[j];
      const styleIndex = j;

      if(pattern.test(key)) {
        styles[styleIndex][key] = value;
        break;
      }

      if(styleIndex === patterns.length-1) {
        styles[styles.length-1][key] = value;
      }
    }
  }
  return styles;
}

export const TagModule = (props:TagProps & { rowGap?:number, columnGap?:number }):JSX.Element => {
  return <TagChildren {...props}/>
}

const TagChildren = ({ children:rawChildren, ...rest }:{ children?:TagElement, style?:TagStyle, numberOfLines?:number, ellipsizeMode?:"head" | "tail" | "middle" | "clip",  rowGap?:number, columnGap?:number }) => {
  let textChildren:(JSX.Element|string)[] = [];
  const children = Children.toArray(rawChildren) as TagElement[];
  const newChildren = Children.map(children, (child, index) => {
    if(!child) return null;
    if(Array.isArray(child)) return child;

    if(typeof child === 'string' || typeof child === 'number' 
    || child.type?.displayName === 'Br' || child.type?.displayName === 'Span') {
      textChildren.push(typeof child === 'number' ? String(child) : child);

      if(index < children.length - 1) {
        return null;
      }

      const cloneTextChildren = [...textChildren];
      textChildren = [];
      return <GroupText textChildren={cloneTextChildren} {...rest}/>;
    }

    if(child.props?.style?.display === 'inline-flex') {
      
      const cloneTextChildren = [...textChildren];
      textChildren = [];
      return (
        <>
          <GroupText textChildren={cloneTextChildren} {...rest}/>
          { React.cloneElement(child, { style: { ...child.props.style, display: 'flex' } }) }
        </>
      )
    }

    const cloneTextChildren = [...textChildren];
    textChildren = [];
    return (
      <>
        <GroupText textChildren={cloneTextChildren} {...rest}/>
        <GapView child={child} {...rest}/>
      </>
    )
    
  })
  return (
    <>
      {newChildren}
    </>
  )
}

const GapView = ({ child, rowGap, columnGap }:{ child:JSX.Element, rowGap?:number, columnGap?:number }) => {
  // gap때문에 View 애들도 따로 처리를 해주어야한다.
  if(rowGap || columnGap) {
    const style:any = {};
    if(rowGap) style.marginVertical = rowGap/2;
    if(columnGap) style.marginHorizontal = columnGap/2;
    
    return (
      React.cloneElement(child, {
        style: {
          ...child.props?.style,
          ...style
        }
      })
    );
  }
  
  return child;
}

const GroupText = ({ textChildren, style, numberOfLines, ellipsizeMode:_ }:{ textChildren:TagElement[], style?:TagStyle, numberOfLines?:number, ellipsizeMode?:"head" | "tail" | "middle" | "clip" }) => {
  if(!textChildren.length) {
    return null;
  }
  return (
    <Text
      style={{
        lineHeight: style?.fontSize ? style.fontSize*1.28 : undefined,
        ...style as TextStyle
      }}
      ellipsizeMode="tail"
      numberOfLines={style?.whiteSpace === 'nowrap' ? 1 : numberOfLines}
    >{textChildren}</Text>
  )
}






// children이 거의 항상 갱신되기 때문에 큰 의미는 없어보이기는 함. 그래도 빼면 아쉽다.
// const tagChildren = useMemo(() => makeTagChildren({ children, style, numberOfLines, ellipsizeMode, rowGap, columnGap }), [children, style, numberOfLines, ellipsizeMode, rowGap, columnGap]);

// 예전 코드. 절대 삭제 금지. 삭제하면 나 울음
/* if(Array.isArray(children)) {
    const newChildren:TagElement[] = [];
    const textchildren:(JSX.Element|string)[] = [];
    Children.forEach(children, (child, i) => {
      if(Array.isArray(child)) {
        newChildren.push(child);
      }
      else if(child) {
        if(typeof child === 'string' || typeof child === 'number') {
          textchildren.push(String(child));
        }
        else if(child.type?.displayName === 'Br' || child.type?.displayName === 'Span') {
          textchildren.push(child);
        }
        else if(child.props?.style?.display === 'inline-flex') {
          child.props.style.display = 'flex';
          textchildren.push(
            React.cloneElement(child, {
              key: `tag_${i}`,
              style: child.props.style
            })
          );
        }
        else {
          if(textchildren.length) {
            newChildren.push(
              <Text key={`tag_${i}`} 
                style={{
                  lineHeight: style?.fontSize ? style.fontSize*1.28 : undefined,
                  ...style as TextStyle
                }}
                ellipsizeMode="tail"
                numberOfLines={style?.whiteSpace === 'nowrap' ? 1 : numberOfLines}
              >{[...textchildren]}</Text>
            )
            textchildren.length = 0;
          }

          if(rowGap || columnGap) {
            const style:any = child.props?.style || {};
            if(rowGap) style.marginVertical = rowGap/2;
            if(columnGap) style.marginHorizontal = columnGap/2;
            
            newChildren.push(
              React.cloneElement(child, {
                key: `tag_${i}`,
                style
              })
            );
          }
          else {
            newChildren.push(child);
          }
        }
      }
      else {
        newChildren.push(child);
      }
    });
    
    // 마지막놈이 스트링이거나 넘버면 한번 더 처리를 해줘야된다.
    if(textchildren.length) {
      newChildren.push(
        <Text key={`tag_${children.length}`} 
          style={{
            lineHeight: style?.fontSize ? style.fontSize*1.28 : undefined,
            ...style as TextStyle
          }}
          ellipsizeMode={ellipsizeMode}
          numberOfLines={style?.whiteSpace === 'nowrap' ? 1 : numberOfLines}
        >{[...textchildren]}</Text>
      );
      textchildren.length = 0;
    }
    return newChildren;
  }
  else if(typeof children === 'string' || typeof children === 'number') {
    return <Text 
      style={{
        lineHeight: style?.fontSize ? style.fontSize*1.28 : undefined,
        ...style as TextStyle
      }}
      ellipsizeMode={ellipsizeMode}
      numberOfLines={style?.whiteSpace === 'nowrap' ? 1 : numberOfLines}
    >{String(children)}</Text>
  }
  else if(children) {
    return children;
  }
  else {
    return null;
  } */