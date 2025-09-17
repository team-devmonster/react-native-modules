declare module "*.svg" {
  import React from 'react';
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}

// Temporary ambient module declarations to unblock TS resolution
declare module '@team-devmonster/react-native-tags';
declare module '@team-devmonster/react-native-router';
declare module '@team-devmonster/react-native-form';