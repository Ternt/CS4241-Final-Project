import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { readLocalStorageValue } from "@mantine/hooks"
import React from 'react';

import { useCourseContext } from "@/components/CourseProvider.tsx"
import { useStateContext } from "@/components/StateProvider.tsx"
import { Scrollbar } from "@/components/Scrollbar/Scrollbar.tsx"
import { SubjectList } from "./SubjectList"
import { CoursesList } from "./CoursesList"
import { CourseInfo } from "./CourseInfo"
import { AddedCoursesList } from "@/routes/Courses/AddedCoursesList.tsx";

import "@/routes/Panel.css"
import "@/routes/Courses/Courses.css"

export function Courses() {
  const { xmlDoc, category } = useCourseContext();
  const { setStoredSubject, setAddedCourses } = useStateContext();
  const currentSubject = readLocalStorageValue<string>({ key: 'subject' });
  const [ selectedCourse, setSelectedCourse ] = React.useState<Element | null>(null);

  return (
    <PanelGroup direction={"horizontal"}>
        <Panel
          style={{ overflow: "auto" }}
          className={"panel"}
          defaultSize={15}
          minSize={10}
          order={1}>
          <Scrollbar maxHeight={"calc(100vh - 50px)"}>
            <SubjectList xmlDoc={xmlDoc} category={category} setStoredSubject={setStoredSubject}/>
          </Scrollbar>
        </Panel>
      <PanelResizeHandle className={"panelHandleVertical"}/>
      <Panel
        className={"panel"}
        order={2}>
        <Scrollbar maxHeight={"calc(100vh - 50px)"}>
          <CoursesList
            xmlDoc={xmlDoc}
            setAddedCourses={setAddedCourses}
            currentSubject={currentSubject}
            setSelectedCourse={setSelectedCourse}
          />
        </Scrollbar>
      </Panel>
      <PanelResizeHandle className={"panelHandleVertical"}/>
      <Panel
        style={{ overflow: "auto "}}
        defaultSize={15}
        order={3}>
        <PanelGroup
          style={{ gap: "calc(var(--app-shell-padding)/4)" }}
          direction={"vertical"}>
          <Panel
            style={{ overflow: "auto "}}
            className={"panel courseInfoContainer"}
            defaultSize={70}
            order={4}>
            <Scrollbar maxHeight={"100%"}>
              <CourseInfo selectedCourse={selectedCourse}/>
            </Scrollbar>
          </Panel>
          <PanelResizeHandle className={"panelHandleHorizontal"}/>
          <Panel
            style={{ overflow: "auto "}}
            className={"panel"}
            defaultSize={30}
            order={5}>
            <Scrollbar maxHeight={"calc(100vh - 50px)"}>
              <AddedCoursesList
                subject={currentSubject}
                setAddedCourses={setAddedCourses}
                setSelectedCourse={setSelectedCourse}
              />
            </Scrollbar>
          </Panel>
        </PanelGroup>
      </Panel>
    </PanelGroup>
  );
}