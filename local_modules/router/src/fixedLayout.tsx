import React from "react";

interface FixedLayoutProps {
  children?:JSX.Element|null|(JSX.Element|null)[]
}
export const FixedLayout = ({ children }:FixedLayoutProps):JSX.Element|null => {
  const newChildren = newChildrenFn({ children });
  return newChildren;
}
FixedLayout.displayName = 'FixedLayout';

const newChildrenFn = ({ children }:FixedLayoutProps):JSX.Element|null => {
  if(Array.isArray(children)) {
    const newChildren:(JSX.Element|null)[] = [];
    children.forEach((child, i) => {
      newChildren.push(
        child ?
        <React.Fragment key={`fixed_${i}`}>
          {
            React.cloneElement(child, {
              style: {
                position: 'absolute',
                ...child.props?.style
              }
            })
          }
        </React.Fragment>
        : child
      )
    })
    return <>{newChildren}</>;
  }
  else {
    return children ? 
      React.cloneElement(children, {
        style: {
          position: 'absolute',
          ...children.props?.style,
        }       
      }) : null;
  }
}