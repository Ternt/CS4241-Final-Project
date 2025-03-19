import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { readLocalStorageValue } from "@mantine/hooks"
import { ScrollArea } from "@mantine/core"
import React from 'react';

import { useCourseContext } from "@/components/CourseProvider.tsx"
import { useStateContext } from "@/components/StateProvider.tsx"
import { SubjectList } from "./SubjectList"
import { CoursesList } from "./CoursesView/CoursesList.tsx"
import { CourseInfo } from "./CoursesView/CourseInfo.tsx"
// import { AddedCoursesList } from "@/routes/Courses/AddedCoursesList.tsx";

import "@/routes/Panel.css"
import "@/routes/Courses/Courses.css"
import {AddedCoursesList} from "@/routes/Courses/CoursesView/AddedCoursesList.tsx";

export function Courses() {
  const { xmlDoc, category } = useCourseContext();
  const { setStoredSubject, setAddedCourses } = useStateContext();
  const currentSubject = readLocalStorageValue<string>({ key: 'subject' });
  const [ selectedCourse, setSelectedCourse ] = React.useState<Element | null>(null);

  return (
    <PanelGroup
      className={"panelGroup"}
      direction={"horizontal"}>
      <Panel
        style={{ overflow: "auto" }}
        className={"panel"}
        defaultSize={15}
        collapsible
        order={1}>
        <ScrollArea
          offsetScrollbars
          type={"always"}
          h={"calc(100vh - 50px)"}>
          <SubjectList xmlDoc={xmlDoc} category={category} setStoredSubject={setStoredSubject}/>
        </ScrollArea>
      </Panel>
      <PanelResizeHandle className={"panelHandleVertical"}/>
      <Panel
        className={"panel"}
        order={2}>
        <ScrollArea
          type={"always"}
          h={"calc(100vh - 50px)"}>
          <CoursesList
            xmlDoc={xmlDoc}
            setAddedCourses={setAddedCourses}
            currentSubject={currentSubject}
            setSelectedCourse={setSelectedCourse}
          />
        </ScrollArea>
      </Panel>
      <PanelResizeHandle className={"panelHandleVertical"}/>
      <Panel
        style={{ overflow: "auto "}}
        defaultSize={20}
        minSize={20}
        order={3}>
        <PanelGroup
          style={{ gap: "calc(var(--app-shell-padding)/4)" }}
          direction={"vertical"}>
          <Panel
            style={{ overflow: "auto "}}
            className={"panel courseInfoContainer"}
            defaultSize={70}
            collapsible
            order={4}>
            <ScrollArea
              offsetScrollbars
              type={"always"}
              h={"100%"}>
              <CourseInfo selectedCourse={selectedCourse}/>
            </ScrollArea>
          </Panel>
          <PanelResizeHandle className={"panelHandleHorizontal"}/>
          <Panel
            style={{ overflow: "auto "}}
            className={"panel"}
            defaultSize={30}
            order={5}>
            <ScrollArea
              offsetScrollbars
              type={"always"}
              h={"100%"}>
              <AddedCoursesList
                setAddedCourses={setAddedCourses}
                setSelectedCourse={setSelectedCourse}
              />
            </ScrollArea>
          </Panel>
        </PanelGroup>
      </Panel>
    </PanelGroup>
  );
}