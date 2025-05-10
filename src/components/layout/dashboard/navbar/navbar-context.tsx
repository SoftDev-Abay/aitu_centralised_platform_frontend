import { createContext, useContext, useState, ReactNode } from "react";

type NavbarContextType = {
  pageTitle: string;
  setPageTitle: (title: string) => void;
  // Add other shared states as needed, e.g. userStatus, searchQuery, etc.
};

const NavbarContext = createContext<NavbarContextType | undefined>(undefined);

export const NavbarProvider = ({ children }: { children: ReactNode }) => {
  const [pageTitle, setPageTitle] = useState("Dashboard");

  return (
    <NavbarContext.Provider value={{ pageTitle, setPageTitle }}>
      {children}
    </NavbarContext.Provider>
  );
};

export const useNavbarContext = () => {
  const context = useContext(NavbarContext);
  if (!context) {
    throw new Error("useNavbarContext must be used within a NavbarProvider");
  }
  return context;
};
