import { useTags } from "./core";
import { Div } from "./div";
import { TagProps } from "./type";

export const H1 = ({style, ...rest}:TagProps) => {

  const { tagConfig } = useTags();
  const tagStyle = tagConfig?.h1?.style;
  
  return (
    <Div 
      style={{
        ...tagStyle, 
        ...style
      }} {...rest}></Div>
  )
}