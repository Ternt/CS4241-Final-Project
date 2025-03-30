import React, { useContext, createContext } from "react";
import { useLocalStorage } from "@mantine/hooks";

import { Map } from '@repo/app-commons/types'

type AppDataContextType = {
  currentSubject: string,
  setStoredSubject: (val: string) => void,
  addedCourses: Map,
  setAddedCourses: (val: Map) => void,
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

const useAppData = () => {
  if (!AppDataContext) {
    throw new Error("useAppData must be used within an <AppDataProvider/>");
  }
  return useContext(AppDataContext);
};

const AppDataProvider: React.FC<never> = ({ children }) => {
  const [ storedSubject, setStoredSubject ] = useLocalStorage({
    key: "subject",
    defaultValue: "CS",
  });
  const [ addedCourses, setAddedCourses ] = useLocalStorage<Map>({
    key: "added_courses",
    defaultValue: {},
  });

  return (
    <AppDataContext.Provider value={{
      currentSubject: storedSubject,
      setStoredSubject: setStoredSubject,
      addedCourses: addedCourses,
      setAddedCourses: setAddedCourses,
    }}>
      {children}
    </AppDataContext.Provider>
  )
};

export { AppDataProvider, useAppData };