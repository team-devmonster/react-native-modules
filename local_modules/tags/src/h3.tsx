import { useTags } from "./core";
import { Div } from "./div";
import { TagProps } from "./type";

export const H3 = ({style, ...rest}:TagProps) => {

  const { tagConfig } = useTags();
  const tagStyle = tagConfig?.h3?.style;
  
  return (
    <Div 
      style={{
        ...tagStyle, 
        ...style
      }} {...rest}></Div>
  )
}