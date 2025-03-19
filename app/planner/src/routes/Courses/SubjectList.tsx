import { readLocalStorageValue } from "@mantine/hooks";
import React from 'react'

import { getTagsFromAttributeValue } from "@/components/data-parse.util.ts"
import "@/routes/Courses/Courses.css"


interface SubjectListProps extends React.HTMLProps<HTMLDivElement> {
  xmlDoc: XMLDocument;
  category: any;
  setStoredSubject: (abbrev: any) => void;
}
export const SubjectList = React.memo(function SubjectList({ xmlDoc, category, setStoredSubject } : SubjectListProps) {
  const currentSubject = readLocalStorageValue<string>({ key: 'subject' });
  const [ activeSubject, setActiveSubject ] = React.useState(currentSubject);

  return (
    <div className={"subjectListContainer"}>
      {category.map((category: string, index: number) => {
        return (
          <CategoryItem
            key={`${category}${index}`}
            xmlDoc={xmlDoc}
            category={category}
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
  xmlDoc: XMLDocument;
  activeSubject: string;
  setActiveSubject: (abbrev: any) => void;
  setStoredSubject: (abbrev: any) => void;
}
const CategoryItem = React.memo(function CategoryItem(
  {
    category,
    xmlDoc,
    activeSubject,
    setActiveSubject,
    setStoredSubject,
  }: CategoryItemProp) {
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
      {(!collapsed) ? getTagsFromAttributeValue(xmlDoc, 'category', category)
        .map((subject: Element, index: number) => {
          const name = subject.getAttribute("name");
          const abbrev = subject.getAttribute("abbrev");
          return (
            <SubjectItem
              key={`${name}${index}`}
              label={name}
              isActive={activeSubject === abbrev}
              className={"subjectItem"}
              onClick={() => {
                setStoredSubject(abbrev);
                setActiveSubject(abbrev);
              }}>
            </SubjectItem>
          );
        }) : undefined}
    </div>
  )
});

export interface SubjectItemProps {
  className?: string;
  label: string | null | undefined;
  isActive: boolean;
  onClick: () => void;
}
const SubjectItem = React.memo(function SubjectItem({ label, isActive, className, onClick, ...props }: SubjectItemProps) {
  return (
    <div
      data-status={isActive}
      className={`${className}`}
      onClick={onClick}
      {...props}>
      {label}
    </div>
  )
});