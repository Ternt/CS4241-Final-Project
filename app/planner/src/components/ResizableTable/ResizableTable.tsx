import React from "react";
import { CourseType, ColumnDef, BaseColumnDef } from "./types";
import "./ResizableTable.css"

// TODO: Design an API that allows you to easily create a table that works with any data shape.

interface ResizableTableProps {
  data: CourseType[];
  columnDef: ColumnDef[];
}

// Responsive Resizable Table component.
export const ResizableTable = React.memo(function ResizableTable(
  {
    data,
    columnDef
  } : ResizableTableProps) {
  const tableRef = React.useRef<HTMLTableElement>(null);
  const [ tableWidth, setTableWidth ] = React.useState(0);
  const [ columns, setColumns ] = React.useState<BaseColumnDef[]>([]);
  const [ isResizing, setIsResizing ] = React.useState(false);
  const [ resizingColumn, setResizingColumn ] = React.useState(-1);

  // initialize column width and populate column definition with needed data
  // to manage state and behaviour.
  React.useEffect(() => {
    if (!tableRef || !tableRef.current) {
      return;
    }

    const table = tableRef.current as HTMLTableElement;
    const { width } = table.getBoundingClientRect();

    const columns: BaseColumnDef[] = columnDef.map(
      (def: ColumnDef, index) => {
        return {
          id: index,
          header: def.header,
          accessor: def.accessor,
          resizable: (index != columnDef.length - 1),
          width: width/columnDef.length,
          }
        }
    )
    setColumns(columns);
  }, []);

  // observe for changes in table container
  React.useEffect(() => {
    if (!tableRef || !tableRef.current) {
      return;
    }

    // determines new width of all columns. Accounts for
    // previous sizes and min sizes of all columns.
    function handleResize() {
      // TODO: figure out bug with getBoundingClientRect, causes ResizeObserver to fire repeatedly
      // TODO: account for column sizing
      const width = tableContainer.clientWidth;

      const newColumnDef: BaseColumnDef[] = columnDef.map(
        (def: ColumnDef, index) => {
          return {
            id: index,
            header: def.header,
            accessor: def.accessor,
            resizable: (index != columnDef.length - 1),
            width: width/columnDef.length,
          }
        }
      )

      setColumns(newColumnDef);
      setTableWidth(width);
    }

    const tableContainer = tableRef.current.parentNode as HTMLElement;

    const observer = new ResizeObserver(handleResize);
    observer.observe(tableContainer);

    return () => {
      observer.disconnect();
    }
  }, [tableWidth]);


  // handles the resizing calculations and logic
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!tableRef || !tableRef.current) {
      return;
    }

    const resizeEle = e.currentTarget as HTMLDivElement;
    const headerEle = e.currentTarget.parentNode as HTMLTableCellElement;
    const styles = getComputedStyle(headerEle);
    const w = parseFloat(styles.width);

    const startPos = {
      x: e.clientX,
    }

    function handleMouseMove(e: MouseEvent) {
      setIsResizing(true);

      const columnId = parseInt(resizeEle.attributes[0].nodeValue ?? "-1", 10);
      setResizingColumn(columnId);

      const minWidth = 30;
      const k = columnDef.length - (columnId + 1);
      const dx = e.clientX - startPos.x;
      const newWidth = w + dx;

      // TODO: width of column gets reset for subsequent col resizing after initial col resizing
      let startWidth = 0;
      const columnWidths: number[] = columns.map(
        (def) => {
          if (def.id < columnId) {
            startWidth += def.width;
            return def.width;
          }

          if (def.id === columnId) {
            const colWidth = Math.min(newWidth, tableWidth - startWidth - (k * minWidth));
            startWidth += colWidth;
            return colWidth;
          }

          const endWidth = Math.max(tableWidth - startWidth, k * minWidth);
          return endWidth/k;
        }
      );

      // create a new column def
      const newColumnDef: BaseColumnDef[] = columns.map(
        (def, index) => {
          return {
            ...def,
            width: columnWidths[index],
          }
        }
      )

      setColumns(newColumnDef);
    }

    function handleMouseUp() {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      setIsResizing(false);
      setResizingColumn(-1);
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  }

  return (
    <>
      <div>
        <div>{resizingColumn}</div>
        <div>{(isResizing) ? "true" : "false"}</div>
        <div>{tableWidth}</div>
        {columns.map(({ accessor, width }) => {
          if (!accessor || !width) {
            return;
          }
          return <div key={accessor + width}>{width}</div>
        })}
      </div>
      <table className={'courseContainer'}>
        <thead
          ref={tableRef}
          className={'courseHeader'}>
        <tr key={'header'}>
          {columns.map(({ header, resizable, width, id }) => {
            return (
              <th
                key={header}
                style={{
                  position: 'relative',
                  width: width,
                  minWidth: width,
                  maxWidth: width,
                }}>
                {header}
                {!resizable ? undefined :
                  <div
                    data-id={id}
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
});