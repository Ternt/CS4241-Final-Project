import React, { useContext, createContext } from "react";
import { useLocalStorage } from "@uidotdev/usehooks";

import { Map } from '@repo/app-commons/types'

type AppDataContextType = {
  currentSubject: string,
  addedCourses: Map,
  setCurrentSubject: (val: string) => void,
  setAddedCourses: (val: Map) => void,
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

const useAppData = () => {
  if (!AppDataContext) {
    throw new Error("useAppData must be used within an <AppDataProvider/>");
  }
  return useContext(AppDataContext);
};


interface ProviderProps {
    children: React.ReactNode;
}

const AppDataProvider = ({ children } : ProviderProps) => {
  const [ storedSubject, setStoredSubject ] = useLocalStorage("subject", "CS");
  const [ addedCourses, setAddedCourses ] = useLocalStorage<Map>("added_courses", {});

  return (
    <AppDataContext.Provider value={{
      currentSubject: storedSubject,
      addedCourses: addedCourses,
      setCurrentSubject: setStoredSubject,
      setAddedCourses: setAddedCourses,
    }}>
      {children}
    </AppDataContext.Provider>
  )
};

export { AppDataProvider, useAppData };
