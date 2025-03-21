import React, { useContext, createContext } from "react";
import { useLocalStorage } from "@mantine/hooks";

type AppDataContextType = {
  currentSubject: string,
  setStoredSubject: (val: never) => void,
  addedCourses: { [key: string]: string },
  setAddedCourses: (val: never) => void,
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

const useAppData = () => {
  if (!AppDataContext) {
    throw new Error("useAppData must be used within an <AppDataProvider/>");
  }
  return useContext(AppDataContext);
};

const AppDataProvider: React.FC<any> = ({ children }) => {
  const [ storedSubject, setStoredSubject ] = useLocalStorage({
    key: "subject",
    defaultValue: "CS",
  });
  const [ addedCourses, setAddedCourses ] = useLocalStorage<{ [key:string]: string }>({
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