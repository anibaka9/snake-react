import { useEffect, useState } from 'react';

function hasWindow(): boolean {
  return typeof window === 'object';
}

export default function useGetPressedKey(): string | null {
  const [activeKeyCode, setActiveKeyCode] = useState<string | null>(null);

  const downHandler = ({ code }: KeyboardEvent) => {
    if (code !== activeKeyCode) {
      setActiveKeyCode(code);
    }
  };

  const upHandler = ({ code }: KeyboardEvent) => {
    if (code === activeKeyCode) {
      setActiveKeyCode(null);
    }
  };

  useEffect(() => {
    if (!hasWindow()) {
      return;
    }

    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);

    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, [downHandler, upHandler]);

  return activeKeyCode;
}
