import React from 'react';
import {
  Cell,
  ColumnDef,
  Header,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import styled from '@emotion/styled';
import { Person } from './Person';

export interface TableProps {
  sticky?: (keyof Person)[];
  data: Person[];
}

export const TableComponent: React.FC<TableProps> = (props) => {
  const columns = React.useMemo<ColumnDef<Person>[]>(() => {
    return !props.data.length
      ? []
      : Object.keys(props.data[0])
        .map((k) => ({
          accessorKey: k,
          cell: (info) => info.getValue(),
        }));
  }, [props.data]);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data: props.data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Container>
      <Table>
        <thead>
          {table
            .getHeaderGroups()
            .map((headerGroup) => (
              <tr key={headerGroup.id}>
                {props.sticky && (
                  <th>
                    {headerGroup.headers
                      .filter((r) => props.sticky?.includes(r.column.id as keyof Person) ?? false)
                      .map((header) => (
                        <StickyHeaderItem
                          key={header.id}
                          {...{
                            onClick: header.column.getToggleSortingHandler(),
                          }}
                        >
                          <HeaderValue header={header}/>
                        </StickyHeaderItem>
                    ))}
                  </th>
                )}
                {headerGroup.headers
                  .filter((r) => !props.sticky?.includes(r.column.id as keyof Person) ?? true)
                  .map((header) => (
                    <th key={header.id} colSpan={header.colSpan}>
                      <div
                        {...{
                          onClick: header.column.getToggleSortingHandler(),
                        }}
                      >
                        <HeaderValue header={header}/>
                      </div>
                    </th>
                  ))
                }
              </tr>
            ))
          }
        </thead>
        <tbody>
          {table
            .getRowModel()
            .rows
            .map((row) => (
              <tr key={row.id}>
                {props.sticky && (
                  <td>
                    {row.getVisibleCells()
                      .filter((r) => props.sticky?.includes(r.column.id as keyof Person) ?? false)
                      .map((cell) => (
                        <StickyValueItem key={cell.id}>
                          <CellValue cell={cell}/>
                        </StickyValueItem>
                      ))
                    }
                  </td>
                )}
                {row.getVisibleCells()
                  .filter((r) => !props.sticky?.includes(r.column.id as keyof Person) ?? true)
                  .map((cell) => (
                    <td key={cell.id}>
                      <CellValue cell={cell}/>
                    </td>
                  )
                )}
              </tr>
            ))
          }
        </tbody>
      </Table>
    </Container>
  );
};

const HeaderValue = (props: { header: Header<Person, unknown>}) => <>
  {flexRender(
    props.header.column.columnDef.header,
    props.header.getContext()
  )}
  {{
    asc: '🔼',
    desc: '🔽',
  }[props.header.column.getIsSorted() as string] ?? null}
</>;

const CellValue = (props: { cell: Cell<Person, unknown> }) => <>
  {(props.cell.column.id === 'check')
    ? <input type='checkbox' checked={!!props.cell.getValue()} readOnly/>
    : flexRender(
      props.cell.column.columnDef.cell,
      props.cell.getContext()
    )
  }
</>;

const Container = styled.div`
  display: block;
  position: relative;
  overflow-x: scroll;
  width: calc(100dvw);
  height: 80dvh;
`;

const Table = styled.table`
  margin: 0;
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  border-style: solid;
  border-color: #345;
  border-width: 0 1px 1px 0;

  tr {
    border-style: solid;
    border-color: #345;
    border-width: 1px 0 0 1px;
  }

  th {
    position: sticky;
    top: 0;
    left: 0;

    text-align: center;
    background: #345;
    cursor: pointer;
    z-index: 2;

    &:first-of-type {
      z-index: 3;
    }
  }

  td {
    padding: 2px 8px;
    text-align: left;
    white-space: nowrap;
    z-index: 0;
    color: #fff;
    background-color: #242424;

    &:first-of-type {
      position: sticky;
      left: 0;
      z-index: 1;
    }
  }

  th,
  td {
    box-sizing: border-box;
  }
`;

const StickyHeaderItem = styled.span`
  display: inline-block;
  width: 120px;
  z-index: 3;
`;

const StickyValueItem = styled.span`
  display: inline-block;
  width: 120px;
  z-index: 1;
`;
