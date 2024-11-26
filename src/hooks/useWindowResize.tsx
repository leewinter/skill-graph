import React, { useEffect, useCallback, useState } from "react";

function debounce<Params extends unknown[]>(
  func: (...args: Params) => unknown,
  timeout: number
): (...args: Params) => void {
  let timer: number;
  return (...args: Params) => {
    clearTimeout(timer);
    timer = window.setTimeout(() => {
      func(...args);
    }, timeout);
  };
}

type UseWindowResizeParams = {
  debounceDelay?: number;
};

export function useWindowResize(
  props: UseWindowResizeParams = { debounceDelay: 500 }
) {
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  const handleResize = useCallback(() => {
    setDimensions({
      height: window.innerHeight,
      width: window.innerWidth,
    });
  }, []);

  useEffect(() => {
    const debouncedHandleResize = debounce(
      handleResize,
      props.debounceDelay || 500
    );

    window.addEventListener("resize", debouncedHandleResize);

    return () => {
      window.removeEventListener("resize", debouncedHandleResize);
    };
  }, [handleResize, props.debounceDelay]);

  return { dimensions };
}
