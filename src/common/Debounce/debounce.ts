import React, { useEffect, useState } from "react";

export const useDebounce = (value: string, ms = 2000) => {

  let [state, setState] = useState<string>()

  useEffect(() => {
    const timeoutId = setTimeout(() => setState(value), ms);
    return () => clearTimeout(timeoutId)
  }, [value])


  return state
};