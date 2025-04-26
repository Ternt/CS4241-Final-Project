import React from "react"
import { fetchAllSubjects } from "@/hooks/data-fetches"

import { CategoryType, SubjectType } from "@repo/app-commons/types"
import { useAppData } from "@/components/Contexts/StateProvider"
import "./SubjectList.css"

export function SubjectList() {
    const { setCurrentSubject } = useAppData();
    const { isPending, isError, data, error } = fetchAllSubjects();

    if (isPending) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    return (
        <div className="subjectListContainer">{
            data.map((data:CategoryType) => {
                return (
                    <CollapsibleCategory 
                        key={data.category}
                        label={data.category}>
                        <div className={"subjectList"}>{
                            data.subjects.map((subject:SubjectType) => {
                                return (
                                    <button 
                                        key={subject.code}
                                        className={"subjectList-button"}
                                        onClick={()=>setCurrentSubject(subject.code)}>
                                        <a>
                                            {subject.type}
                                        </a>
                                    </button>
                                )
                            })
                        }</div>
                    </CollapsibleCategory>
                )
            })
        }</div>
    )
}


interface CollapsibleCategoryProps {
    children?: React.ReactNode;
    label: string;
}
export function CollapsibleCategory({ children, label } : CollapsibleCategoryProps) {
    const [ active, setActive ] = React.useState(true);

    return (
        <div className={"category"}>
            <button 
                className={"category-button"}
                onClick={()=>setActive(!active)}>
                <a className="category-text">
                    {label}
                </a>
            </button>
            {(active) ? children : undefined}
        </div>
    )
}
