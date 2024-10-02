import { useContext } from "react";
import { AppContext } from "../components/Context/Context";

export function useCustomContext() {
  return useContext(AppContext)
}

export default useCustomContext