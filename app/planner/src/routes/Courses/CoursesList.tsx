import React from 'react'

import { useAppData } from '@/components/Contexts/StateProvider'
import { fetchCourses } from '@/hooks/data-fetches'
import { CourseType } from '@repo/app-commons/types'

export function CoursesList() {
    const { currentSubject } = useAppData();
    const { isPending, isError, data, error } = fetchCourses(currentSubject);

    if (isPending) {
        return <span>Loading...</span>;
    }

    if (isError) {
        return <span>Error: {error.message}</span>;
    }

    return (
        <>
            {data.map((course:CourseType) => {
                return (
                    <div style={{ display: "flex", flexDirection: "row" }}>
                        <div></div>
                    </div>
                )
            })}
        </>
    )
}
