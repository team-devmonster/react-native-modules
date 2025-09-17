import React from "react";

interface FixedLayoutProps {
  children?:React.ReactElement|null|(React.ReactElement|null)[]
}
export const FixedLayout = ({ children }:FixedLayoutProps):React.ReactElement|null => {
  const newChildren = newChildrenFn({ children });
  return newChildren;
}
FixedLayout.displayName = 'FixedLayout';

const newChildrenFn = ({ children }:FixedLayoutProps):React.ReactElement|null => {
  if(Array.isArray(children)) {
    const newChildren:(React.ReactElement|null)[] = [];
    children.forEach((child, i) => {
      newChildren.push(
        child ?
        <React.Fragment key={`fixed_${i}`}>
          {
            React.cloneElement(child as any, {
              style: {
                position: 'absolute',
                ...((child as any).props?.style || {})
              }
            })
          }
        </React.Fragment>
        : child
      )
    })
    return <>{newChildren}</> as any;
  }
  else {
    return children ? 
      React.cloneElement(children as any, {
        style: {
          position: 'absolute',
          ...((children as any).props?.style || {}),
        }       
      }) as any : null;
  }
}