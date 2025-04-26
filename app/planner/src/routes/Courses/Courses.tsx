import React from 'react'
import { Container, Section, Bar } from '@column-resizer/react'

import { SubjectList } from "@/routes/Courses/SubjectList"
import { CoursesList } from "@/routes/Courses/CoursesList"
import "@/routes/Courses/Panel.css"
import "@/routes/Courses/Courses.css"

export function Courses() {
    const [ selectedCourse, setSelectedCourse ] = React.useState<Element | null>(null);

    return (
        <Container className={"panelGroup"}>
            <Section 
                style={{ borderRadius: `0.4rem 0 0 0.4rem`, }}
                className={"panel"}
                defaultSize={300}>
                <SubjectList/>
            </Section>
            <Bar className={"panelHandleVertical"} size={5}/>
            <Section 
                className={"panel"}>
                <CoursesList/>
            </Section>
            <Bar className={"panelHandleVertical"} size={5}/>
            <Section 
                style={{ borderRadius: `0 0.4rem 0.4rem 0`, }}
                className={"panel"}
                defaultSize={500}>
                <Container style={{ height: '100%' }} vertical>
                    <Section 
                        className={"panel"}>
                        balls
                    </Section>
                    <Bar className={"panelHandleHorizontal"} size={5}/>
                    <Section 
                        className={"panel"}
                        defaultSize={500}>
                        balls
                    </Section>
                </Container>
            </Section>
        </Container>
    );
}
