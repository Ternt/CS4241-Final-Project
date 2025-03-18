import React from 'react'

import { getTagsFromAttributeValue } from "@/components/data-parse.util.ts"
import "@/routes/Courses/Courses.css"


interface SubjectListProps extends React.HTMLProps<HTMLDivElement> {
  xmlDoc: XMLDocument;
  category: any;
  setStoredSubject: (abbrev: any) => void;
}
export const SubjectList = React.memo(function SubjectList({ xmlDoc, category, setStoredSubject } : SubjectListProps) {
  const [ collapsed, setCollapsed ] = React.useState(false);

  return (
    <>
      {category.map((category: string, index: number) => {
        return (
          <CategoryItem
            key={`${category}${index}`}
            xmlDoc={xmlDoc}
            category={category}
            setStoredSubject={setStoredSubject}
          />
        );
      })}
    </>
  );
});

export interface CategoryItemProp {
  category: string;
  xmlDoc: XMLDocument;
  setStoredSubject: (abbrev: any) => void;
}
const CategoryItem = React.memo(function CategoryItem({ category, xmlDoc, setStoredSubject }: CategoryItemProp) {
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
              className={"subjectItem"}
              onClick={() => setStoredSubject(abbrev)}>
            </SubjectItem>
          );
        }) : undefined}
    </div>
  )
});

export interface SubjectItemProps {
  className?: string;
  label: string | null | undefined;
  onClick: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}
const SubjectItem = React.memo(function SubjectItem({ label, className, onClick, ...props }: SubjectItemProps) {
  return (
    <div
      className={`${className}`}
      onClick={onClick}
      {...props}>
      {label}
    </div>
  )
});