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

  if (!courses) {
    return <></>
  }

  return (
    <>
      {courses.map((course: Element, index: number) => {
        const name = course.getAttribute("name");

        return (
          <CourseItem
            key={`${name}${index}`}
            subject={currentSubject}
            course={course}
            clickCB={() => {
              const newValue = readLocalStorageValue<{ [key:string]: string }>({key: 'added_courses'});
              if (name && !newValue[name]) {
                newValue[name] = course.outerHTML;
                setAddedCourses(newValue);
              }
            }}
            setSelectedCourse={setSelectedCourse}
            className={"courseItem"}>
          </CourseItem>
        )
      })}
    </>
  )
};

export interface CourseItemProps extends React.HTMLProps<HTMLDivElement> {
  course: Element;
  subject: string;
  compact?: boolean;
  icon?: React.ReactNode;
  clickCB?: () => void;
  setSelectedCourse?: (course: Element) => void;
}
export const CourseItem = React.memo(function CourseItem(
  {
    course,
    subject,
    compact,
    icon,
    clickCB,
    setSelectedCourse,
    className
  }: CourseItemProps ) {
  const label = React.useMemo(() => course.getAttribute("name"), []);
  const courseNumber = React.useMemo(() => course.getAttribute("number"), []);

  const handleOnClick = React.useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    if (clickCB) {
      clickCB();
    }
    return;
  }, []);

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
      className={className}
      onClick={(setSelectedCourse) ? ()=>setSelectedCourse(course) : undefined}>
      <button
        className={"courseItemButton}"}
        onClick={handleOnClick}>
        {(icon) ?
          icon : <Plus size={"1rem"} />
        }
      </button>
      <a className={"courseItemSection courseCode"}>
        {`${subject} ${courseNumber}`}
      </a>
      <div className={"termRibbon"}>
        {["A", "B", "C", "D"].map(term => {
          const status = getStatus(term, course);
          return (
            <TermButton
              key={`${label}${subject}${courseNumber}${term}`}
              status={status}
              term={term}/>
          )
        })}
      </div>
      {compact ?
        undefined :
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