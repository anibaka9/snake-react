import { useState, useEffect } from 'react';

const useRenderCurcle = ({ fps, on }: { fps: number; on: boolean }): boolean => {
  const [renderNow, setRenderNow] = useState<boolean>(true);
  useEffect(() => {
    if (renderNow && on) {
      setRenderNow(false);
      setTimeout(() => {
        setRenderNow(true);
      }, 1000 / fps);
    }
  }, [fps, on, renderNow]);
  return renderNow;
};

export default useRenderCurcle;
