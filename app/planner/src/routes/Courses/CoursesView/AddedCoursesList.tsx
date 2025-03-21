import { readLocalStorageValue } from '@mantine/hooks'
import { Minus } from 'lucide-react'
import React from 'react'

import { CourseItem } from './CoursesList.tsx'
import "@/routes/Courses/Courses.css";

interface AddedCoursesListProps {
  setAddedCourses: (course: { [key:string]: string }) => void;
  setSelectedCourse: (course: Element) => void;
}
export function AddedCoursesList({ setAddedCourses, setSelectedCourse } : AddedCoursesListProps) {
  const list = readLocalStorageValue<{ [key:string]: string }>({ key: 'added_courses' });

  if (!list) {
    return <></>;
  }

  const handleRemoveCourse = (name: string, list: { [key:string]: string }) => {
    if (name && list[name]) {
      delete list[name];
      setAddedCourses(list);
    }
  }

  return (
    <>
      {Object.values(list).map((courseString) => {
        const course = new DOMParser().parseFromString(courseString, 'text/xml').documentElement;
        const name = course.getAttribute("name") ?? "N/A";
        return (
          <CourseItem
            key={courseString}
            icon={<Minus size={"1rem"} />}
            compact={true}
            course={course}
            clickCB={() => handleRemoveCourse(name, list)}
            onClick={() => setSelectedCourse(course)}
            className={"courseItem"}>
          </CourseItem>
        )
      })}
    </>
  )
};