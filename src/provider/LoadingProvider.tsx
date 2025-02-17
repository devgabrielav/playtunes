import { ReactNode, useState } from "react";
import { LoadingContext } from "../context/LoadingContext";

function LoadingProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={ { loading, setLoading } }>
      { children }
    </LoadingContext.Provider>
  )
}

export default LoadingProvider;