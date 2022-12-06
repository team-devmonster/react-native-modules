import React from "react";

interface FixedLayoutProps {
  children?:JSX.Element|null|(JSX.Element|null)[]
}
export const FixedLayout = ({ children }:FixedLayoutProps) => {
  const newChildren = newChildrenFn({ children });
  return newChildren;
}
FixedLayout.displayName = 'FixedLayout';

const newChildrenFn = ({ children }:FixedLayoutProps):JSX.Element|any => {
  if(!children) return null;
  else if(Array.isArray(children)) {
    const newChildren:(JSX.Element|null)[] = [];
    children.forEach((child, i) => {
      newChildren.push(
        child ?
        React.cloneElement(child, {
          style: {
            position: 'absolute',
            ...child.props?.style
          }
        })
        : child
      )
    })
    return newChildren;
  }
  else {
    return React.cloneElement(children, {
      style: {
        position: 'absolute',
        ...children.props?.style,
      }       
    });
  }
}