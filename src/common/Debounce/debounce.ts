import React, { useEffect, useState } from "react";

export const useDebounce = (fn: (...args: any[]) => void, ms = 2000) => {
  let [timeoutId, setTimeoutId] = useState<any | null>()


  const debouncedFunc = (...args: any[])  => {
    if(timeoutId) clearTimeout(timeoutId)
    const newTimeout = setTimeout(() => {
      fn(...args)
      if(newTimeout === timeoutId){
        setTimeoutId(null)
      }
    }, ms);

    setTimeoutId(newTimeout)
  }
  return debouncedFunc
};