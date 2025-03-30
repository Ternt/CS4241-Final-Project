import { readLocalStorageValue } from "@mantine/hooks"
import { Plus } from "lucide-react"
import React from "react"

import { fetchCourses } from "@/hooks/data-fetches"
import "@/routes/Courses/Courses.css"


// TODO: Design an API that allows you to easily create a table that works with any data shape.
type CourseType = {
  code: string;
  title: string;
  description: string;
  instructors: string;
  waitlist_capacity: string;
  enrolled_capacity: string;
  credits: number;
  subject: string;
  academic_level: string;
  academic_terms_pattern: string[];
  offering_periods: string[];
  academic_period: string;
  course_tags: string[];
}

type ColumnDef = {
  header: string;
  resizable: boolean;
  accessor: string;
  width: number;
}

type ColumnDefResolved = Partial<ColumnDef>

interface CourseListProps extends React.HTMLProps<HTMLDivElement> {
  setAddedCourses: (list: { [key:string]: string }) => void;
  setSelectedCourse: (course: Element) => void;
}
export const CoursesList = function CoursesList(
  {
    setAddedCourses,
    setSelectedCourse
  }: CourseListProps ) {
  const currentSubject = readLocalStorageValue<string>({ key: 'subject' });
  const { status, data, error } = fetchCourses(currentSubject);
  // const [ activeCourse, setActiveCourse ] = React.useState('');

  if ( status === 'pending' ) {
    return <span>Loading...</span>
  }

  if ( status === 'error' ) {
    return <span>Error {error.message}</span>
  }

  const columns = [
    {
      header: 'Course Code',
      accessor: 'code'
    },
    {
      header: 'Title',
      accessor: 'title',
    },
    {
      header: 'Terms',
      accessor: 'term',
    },
    {
      header: 'Description',
      accessor: 'description',
    },
  ];

  return (
    <ResizableTable data={data} columnDef={columns}/>
  )
};


interface ResizableTableProps {
  data: CourseType[];
  columnDef: ColumnDefResolved[];
}

// Responsive Resizable Table component.
const ResizableTable = ({ data, columnDef } : ResizableTableProps) => {
  const tableRef = React.useRef<HTMLTableElement>(null);
  const [ tableWidth, setTableWidth ] = React.useState(0);
  const [ columns, setColumns ] = React.useState<ColumnDefResolved[]>([]);

  // initialize column widths
  React.useEffect(() => {
    if (!tableRef || !tableRef.current) {
      return;
    }

    const table = tableRef.current as HTMLTableElement;
    const { width } = table.getBoundingClientRect();

    const columns: ColumnDefResolved[] = columnDef;
    for (let i = 0 ; i < columns.length ; i++) {
      columns[i]["width"] = width/columns.length;
      if (i != columns.length - 1) {
        columns[i]["resizable"] = true;
      }
    }
    setColumns(columns);
  }, []);

  // observe for changes in table
  React.useEffect(() => {
    if (!tableRef || !tableRef.current) {
      return;
    }

    const table = tableRef.current as HTMLTableElement;

    const handleResize = () => {
      const { width } = table.getBoundingClientRect();
      for (let i = 0 ; i < columns.length ; i++) {
        console.log(columns[i].width);
      }
      setTableWidth(width);
    }

    const observer = new ResizeObserver(handleResize);
    observer.observe(table);

    return () => {
      observer.disconnect();
    }
  }, [tableWidth]);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!tableRef || !tableRef.current) {
      return;
    }

    const table = tableRef.current;
    const ele = e.currentTarget;
    const startPos = {
      x: e.clientX,
    }

    // this function handles the resizing calculations. There are several behaviours that we want.
    // First, responsiveness. This means that table columns adapt no matter the width of the table.
    function handleMouseMove(e: MouseEvent) {
      const dx = e.clientX - startPos.x;
    }

    function handleMouseUp() {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  }

  return (
    <>
      <div>
        {tableWidth}
        {columns.map(({ accessor, width }) => {
          if (!accessor || !width) {
            return;
          }
          return <div key={accessor + width}>{width}</div>
        })}
      </div>
      <table
        ref={tableRef}
        className={'courseContainer'}>
        <thead className={'courseHeader'}>
        <tr key={'header'}>
          {columns.map(({ header, resizable, width }) => {
            return (
              <th
                key={header}
                style={{
                  position: 'relative',
                  width: width
                }}>
                {header}
                {!resizable ? undefined :
                  <div
                    className={'resizer'}
                    onMouseDown={handleMouseDown}
                  />
                }
              </th>
            )
          })}
        </tr>
        </thead>
        <tbody>
        {/*{data.map((data: CourseType) => (*/}
        {/*  <tr key={data.subject + data.code}>*/}
        {/*    {columns.map(({ accessor }) => {*/}
        {/*      const tData = data[accessor as keyof CourseType] ?? "——";*/}
        {/*      return <td key={accessor}>{`${data.subject} ${tData}`}</td>*/}
        {/*    })}*/}
        {/*  </tr>*/}
        {/*))}*/}
        </tbody>
      </table>
    </>
  )
}

const Resizable = React.memo(function Resizable({ children }) {
  const [ node, setNode ] = React.useState<HTMLElement | null>(null);

  const ref = React.useCallback((nodeEle: HTMLElement) => {
    setNode(nodeEle);
  }, []);

  const handleMouseDown = React.useCallback((e: MouseEvent) => {
    if (!node) {
      return;
    }

    const parent = node.parentElement;
    const startPos = {
      x: e.clientX,
      y: e.clientY
    }
    const styles = window.getComputedStyle(parent);
    const w = parseInt(styles.width, 10);
    const h = parseInt(styles.width, 10);

    const handleMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - startPos.x;
      parent.style.width = `${Math.max(w + dx, 20)}px`;
    }

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }, [node]);

  React.useEffect(() => {
    if (!node) {
      return;
    }

    node.addEventListener('mousedown', handleMouseDown);

    return () => {
      node.removeEventListener('mousedown', handleMouseDown);
    }
  }, [node])

  return children({ ref });
});

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