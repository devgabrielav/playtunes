import { createContext } from "react";

type LoadingContextType = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const initialValue: LoadingContextType = {
  loading: false,
  setLoading: () => {}
}

export const LoadingContext = createContext(initialValue);