import { readLocalStorageValue } from "@mantine/hooks";
import React from 'react'

import { CategoryType, SubjectType } from "@repo/app-commons/types";
import { fetchAllSubjects } from "@/hooks/data-fetches"
import "@/routes/Courses/SubjectList.css"


export interface SubjectListProp {
  setStoredSubject: (val: string) => void;
}
export const SubjectList = React.memo((
  {
    setStoredSubject
  } : SubjectListProp) => {
  const { status, data, error } = fetchAllSubjects();
  const currentSubject = readLocalStorageValue<string>({ key: 'subject' });
  const [ activeSubject, setActiveSubject ] = React.useState(currentSubject);

  if ( status === "pending" ) {
    return <div>Loading...</div>
  }

  if ( status === "error" ) {
    return <div>Error {error.message}</div>
  }

  return (
    <div className={"subjectListContainer"}>
      {data.map((categoryObject: CategoryType) => {
        return (
          <CategoryItem
            key={`${categoryObject.category}`}
            category={categoryObject.category}
            subjects={categoryObject.subjects}
            activeSubject={activeSubject}
            setActiveSubject={setActiveSubject}
            setStoredSubject={setStoredSubject}
          />
        );
      })}
    </div>
  );
});


export interface CategoryItemProp {
  category: string;
  subjects: SubjectType[];
  activeSubject: string;
  setActiveSubject: (val: string) => void;
  setStoredSubject: (val: string) => void;
}
const CategoryItem = React.memo((
  {
    category,
    subjects,
    activeSubject,
    setActiveSubject,
    setStoredSubject,
  } : CategoryItemProp) => {
  const [ collapsed, setCollapsed ] = React.useState(false);

  return (
    <div className={"categoryItem"}>
      <button
        className={"collapsibleCategoryItem"}
        onClick={() => setCollapsed(!collapsed)}>
        <a className={"departmentName"}>
          {category}
        </a>
      </button>
      {(!collapsed) ?
        subjects.map((subject, index) => {
          return (
            <SubjectItem
              key={`${subject.type}${index}`}
              label={subject.type}
              isActive={activeSubject === subject.code}
              className={"subjectItem"}
              onClick={() => {
                setStoredSubject(subject.code);
                setActiveSubject(subject.code);
              }}
            >
            </SubjectItem>
          );
        }) : undefined}
    </div>
  )
});


export interface SubjectItemProps {
  label: string | null | undefined;
  isActive: boolean;
  className: string;
  onClick: () => void;
}
const SubjectItem = React.memo((
  {
    label,
    isActive,
    className,
    onClick,
  }: SubjectItemProps) => {
  return (
    <div
      data-status={isActive}
      className={className}
      onClick={onClick}>
      {label}
    </div>
  )
});