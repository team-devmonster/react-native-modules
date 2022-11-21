import React from "react";

interface FixedLayoutProps {
  children?:React.ReactNode
}
export const FixedLayout = ({ children }:FixedLayoutProps) => {
  const newChildren = newChildrenFn({ children });
  return newChildren;
}
FixedLayout.displayName = 'FixedLayout';

const newChildrenFn = ({ children }:FixedLayoutProps):JSX.Element|any => {
  if(!children) return null;
  if(typeof children === 'string' || typeof children === 'number' || typeof children === 'boolean') {
    return null;
  }
  else if(Array.isArray(children)) {
    return children.map(child => {
      if(typeof children === 'string' || typeof children === 'number' || typeof children === 'boolean') {
        return null;
      }
      else {
        return React.cloneElement(child, {
          style: {
            position: 'absolute',
            ...child.props?.style,
          }       
        });
      }
    });
  }
  else {
    const anyChildren:any = children;
    return React.cloneElement(anyChildren, {
      style: {
        position: 'absolute',
        ...anyChildren.props?.style,
      }       
    });
  }
}