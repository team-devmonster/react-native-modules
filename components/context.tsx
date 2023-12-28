
import React, { Dispatch } from "react";

const AppContext = React.createContext<{ 
  checkJWT:any,
  loading:{
    isLoading:boolean
    setIsLoading:Dispatch<boolean>
  },
  loadingLocal:{
    isLoading:boolean
    setIsLoading:Dispatch<boolean>
  },
  instanceInit: any
}>({ 
  checkJWT:null,
  loading:{ isLoading: false, setIsLoading: null as any },
  loadingLocal:{ isLoading: false, setIsLoading: null as any },
  instanceInit: null as any
});

export default AppContext;