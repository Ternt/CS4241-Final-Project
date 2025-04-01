import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { ScrollArea } from "@mantine/core"
import React from 'react';

import { useAppData } from "@/components/Contexts/StateProvider.tsx"
import { SubjectList } from "./SubjectList.tsx"
import { CoursesList } from "./CoursesList.tsx"
import { CourseInfo } from "./CourseInfo.tsx"
import { AddedCoursesList } from "@/routes/Courses/AddedCoursesList.tsx";

import "@/routes/Courses/Panel.css"
import "@/routes/Courses/Courses.css"

export function Courses() {
  const appData = useAppData();
  const [ selectedCourse, setSelectedCourse ] = React.useState<Element | null>(null);

  if (!appData) {
    return <></>;
  }

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
          <SubjectList setStoredSubject={appData.setStoredSubject} />
        </ScrollArea>
      </Panel>
      <PanelResizeHandle className={"panelHandleVertical"}/>
      <Panel
        className={"panel"}
        order={2}>
        <CoursesList
          setAddedCourses={appData.setAddedCourses}
          setSelectedCourse={setSelectedCourse}
        />
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
            {/*<ScrollArea*/}
            {/*  offsetScrollbars*/}
            {/*  type={"always"}*/}
            {/*  h={"100%"}>*/}
            {/*  <CourseInfo selectedCourse={selectedCourse}/>*/}
            {/*</ScrollArea>*/}
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
              {/*<AddedCoursesList*/}
              {/*  setAddedCourses={setAddedCourses}*/}
              {/*  setSelectedCourse={setSelectedCourse}*/}
              {/*/>*/}
            </ScrollArea>
          </Panel>
        </PanelGroup>
      </Panel>
    </PanelGroup>
  );
}