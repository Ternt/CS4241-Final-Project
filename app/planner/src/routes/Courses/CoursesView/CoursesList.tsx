import { readLocalStorageValue } from "@mantine/hooks"
import { Plus } from "lucide-react"
import React from "react"

import { getTagFromAttributeValue } from "@/components/data-parse.util.ts"
import "@/routes/Courses/Courses.css"

interface CourseListProps extends React.HTMLProps<HTMLDivElement> {
  xmlDoc: XMLDocument;
  currentSubject: any;
  setAddedCourses: (list: { [key:string]: string }) => void;
  setSelectedCourse: (course: Element) => void;
}
export const CoursesList = function CoursesList(
  {
    xmlDoc,
    setAddedCourses,
    currentSubject,
    setSelectedCourse
  }: CourseListProps ) {
  const courses = getTagFromAttributeValue(xmlDoc, 'abbrev', currentSubject);
  const [ activeCourse, setActiveCourse ] = React.useState('');

  const handleOnClick = (name: string, course: Element) => {
    const newValue = readLocalStorageValue<{ [key:string]: string }>({key: 'added_courses'});
    if (name && !newValue[name]) {
      newValue[name] = course.outerHTML;
      setAddedCourses(newValue);
    }
  }

  if (!courses) {
    return <></>
  }

  return (
    <>
    </>
  )
};

export interface CourseItemProps extends React.HTMLProps<HTMLDivElement> {
  course: Element;
  compact?: boolean;
  icon?: React.ReactNode;
  isActive?: boolean;
  clickCB: () => void;
}
export const CourseItem = React.memo(function CourseItem(
  {
    course,
    compact,
    icon,
    isActive,
    clickCB,
    onClick,
    className
  }: CourseItemProps ) {
  const label = React.useMemo(() => course.getAttribute("name"), []);
  const courseCode = React.useMemo(() => course.getAttribute("code"), []);

  const getStatus = React.useCallback((term: string, course: Element) => {
    const period = course.getAttribute("academic_period")
    if (period && term === period[0]) {
      return "available";
    }

    const enrolled = course.getAttribute("enrolled")
    if (enrolled) {
      const [seats, capacity] = enrolled.split("/");
      if (seats >= capacity) {
        return "under-waitlist";
      }
    }

    return "not-available";
  }, []);

  return (
    <div
      data-active={isActive}
      onClick={onClick}
      className={className}>
      <button
        className={"courseItemButton}"}
        onClick={clickCB}>
        {
          (icon) ? icon : <Plus size={"1rem"} />
        }
      </button>
      <a className={"courseItemSection courseCode"}>
        {`${courseCode}`}
      </a>
      <div className={"termRibbon"}>
        {
          ["A", "B", "C", "D"].map(term => {
            const status = getStatus(term, course);
            return (
              <TermButton
                key={`${label}${courseCode}${term}`}
                status={status}
                term={term}
              />
            )
          })
        }
      </div>
      {
        compact ? undefined :
        <a className={"courseItemSection courseTitle"}>
          {label}
        </a>
      }
    </div>
  )
});

export interface TermButtonProps extends React.HTMLProps<HTMLDivElement> {
  term: string;
  status: string;
}
export function TermButton({ term, status, ...props } : TermButtonProps) {

  return (
    <div
      data-status={status}
      className={"termButton"}
      {...props}
    >
      {term}
    </div>
  );
}