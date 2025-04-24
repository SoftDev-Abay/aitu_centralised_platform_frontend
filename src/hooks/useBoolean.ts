import { useCallback, useState } from "react";

export default function useBoolean(
  initial: boolean
): [boolean, { setTrue: () => void; setFalse: () => void }] {
  const [value, setValue] = useState(initial);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  return [value, { setTrue, setFalse }];
}
