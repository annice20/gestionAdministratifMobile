import React, { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import { ProfileData } from "../types/types";

interface UserContextType {
  userData: ProfileData | null;
  setUserData: Dispatch<SetStateAction<ProfileData | null>>;
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
}

interface UserProviderProps {
  children: ReactNode;
}

export const UserContext = createContext<UserContextType>({
  userData: null,
  setUserData: () => {},
  token: null,
  setToken: () => {},
});

export const UserProvider = ({ children }: UserProviderProps) => {
  const [userData, setUserData] = useState<ProfileData | null>(null);
  const [token, setToken] = useState<string | null>(null);

  return (
    <UserContext.Provider value={{ userData, setUserData, token, setToken }}>
      {children}
    </UserContext.Provider>
  );
};
