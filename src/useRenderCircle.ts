import { useState, useEffect } from 'react';

const useRenderCircle = ({ fps, on }: { fps: number; on: boolean }): boolean => {
  const [renderNow, setRenderNow] = useState<boolean>(false);

  useEffect(() => {
    if (on) {
      setRenderNow(true);
    } else {
      setTimeout(() => {
        setRenderNow(false);
      }, 1001 / fps);
    }
  }, [on]);

  useEffect(() => {
    if (renderNow && on) {
      setRenderNow(false);
      setTimeout(() => {
        setRenderNow(true);
      }, 1000 / fps);
    }
  }, [fps, on, renderNow]);
  return renderNow && on;
};

export default useRenderCircle;
