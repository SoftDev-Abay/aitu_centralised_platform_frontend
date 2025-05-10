import { useEffect } from "react";
import { useNavbarContext } from "./navbar-context";

export const useSetNavbarTitle = (title: string) => {
  const { setPageTitle } = useNavbarContext();

  useEffect(() => {
    setPageTitle(title);
  }, [setPageTitle, title]);
};
