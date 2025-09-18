import React, { createContext, useState } from "react";

export interface UserData {
  nom: string;
  prenoms: string;
  dateDeNaissance: string;
  nationalite?: string;
  adresse: string;
  telephone: string;
  email: string;
  langue: string;
}

export interface UserContextType {
  userData: UserData;
  setUserData: React.Dispatch<React.SetStateAction<UserData>>;
}

export const UserContext = createContext<UserContextType>({
  userData: {
    nom: "",
    prenoms: "",
    dateDeNaissance: "",
    nationalite: "",
    adresse: "",
    telephone: "",
    email: "",
    langue: "",
  },
  setUserData: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserData>({
    nom: "",
    prenoms: "",
    dateDeNaissance: "",
    nationalite: "",
    adresse: "",
    telephone: "",
    email: "",
    langue: "",
  });
  return (
    <UserContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserContext.Provider>
  );
};