import React, { useState, useMemo, useEffect } from "react";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import Dropdown from "@/components/ui/Dropdown";
import { Menu } from "@headlessui/react";
import {
    useTable,
    useRowSelect,
    useSortBy,
    useGlobalFilter,
    usePagination,
} from "react-table";
import GlobalFilter from "./GlobalFilter";
import {deleteQuiz, getQuizs} from "@/Services/quizApi.js";
import Button from "@/components/ui/Button.jsx";
import {Link} from "react-router-dom";



const actions = [
    {
        name: "view",
        icon: "heroicons-outline:eye",
    },
    {
        name: "edit",
        icon: "heroicons:pencil-square",
    },
    {
        name: "delete",
        icon: "heroicons-outline:trash",
    },
];

const IndeterminateCheckbox = React.forwardRef(({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
        resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return <input type="checkbox" ref={resolvedRef} {...rest} className="table-checkbox" />;
});

const GameList = () => {
    const COLUMNS = [
        {
            Header: "Id",
            accessor: "id",
            Cell: (row) => {
                return <span>{row?.cell?.value}</span>;
            },
        },
        {
            Header: "Name",
            accessor: "name",
            Cell: (row) => {
                return <span>#{row?.cell?.value}</span>;
            },
        },
        {
            Header: "Subject",
            accessor: "subject",
            Cell: (row) => {
                return <span>#{row?.cell?.value}</span>;
            },
        },
        {
            Header: "Action",
            accessor: "action",
            Cell: (row) => {
                return (
                    <div>
                        <Dropdown
                            classMenuItems="right-0 w-[140px] top-[110%] "
                            label={
                                <span className="text-xl text-center block w-full">
                                <Icon icon="heroicons-outline:dots-vertical" />
                            </span>
                            }
                        >
                            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                {actions.map((item, i) => (
                                    <Menu.Item key={i}>
                                        <div
                                            onClick={()=>deletequiz(row.row.original.id)}
                                            className={`${
                                                item.name === "delete"
                                                    ? "bg-danger-500 text-danger-500 bg-opacity-30 hover:bg-opacity-100 hover:text-white"
                                                    : "hover:bg-slate-900 hover:text-white dark:hover:bg-slate-600 dark:hover:bg-opacity-50"
                                            } w-full border-b border-b-gray-500 border-opacity-10 px-4 py-2 text-sm cursor-pointer first:rounded-t last:rounded-b flex items-center`}
                                        >
                                        <span className="text-base">
                                            <Icon icon={item.icon} />
                                        </span>
                                            <span>{item.name}</span>
                                        </div>
                                    </Menu.Item>
                                ))}
                            </div>
                        </Dropdown>
                    </div>
                );
            },
        },
    ];

    const columns = useMemo(() => COLUMNS, []);
    const [quizes, setQuizes] = useState([]);

    useEffect(() => {
        getQuizs().then((data) => {
            const formattedData = data.map((quiz) => ({
                id: quiz.id,
                name: quiz.name,
                subject: quiz.subject,
            }));
            setQuizes(formattedData);
        });
    }, []);

    function deletequiz(id){
        deleteQuiz(id).then(() =>  setQuizes(quizes.filter((quiz) => quiz.id !== id)))
    }

    const tableInstance = useTable(
        {
            columns,
            data: quizes,
        },
        useGlobalFilter,
        useSortBy,
        usePagination,
        useRowSelect,
        (hooks) => {
            hooks.visibleColumns.push((columns) => [
                {
                    id: "selection",
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <div>
                            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                        </div>
                    ),
                    Cell: ({ row }) => (
                        <div>
                            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                        </div>
                    ),
                },
                ...columns,
            ]);
        }
    );

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        page,
        nextPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        setGlobalFilter,
        pageOptions,
        state,
        gotoPage,
        prepareRow,
    } = tableInstance;

    const { globalFilter, pageIndex } = state;

    return (
        <Card noborder>
            <div className="md:flex justify-between items-center mb-6">
                <h4 className="card-title">Quizes</h4>
                <div className="flex gap-5">
                    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
                    <Link className="bg-slate-800 dark:border-white-300 text-white rounded-2xl px-4 py-2 " to={"add"}>Add</Link>
                </div>
            </div>
            <div className="overflow-x-auto -mx-6">
                <table className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700" {...getTableProps()}>
                    <thead className="border-t border-slate-100 dark:border-slate-800">
                    {headerGroups.map((headerGroup) => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => (
                                <th {...column.getHeaderProps(column.getSortByToggleProps())} className="table-th">
                                    {column.render("Header")}
                                    <span>
                                            {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                                        </span>
                                </th>
                            ))}
                        </tr>
                    ))}
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700" {...getTableBodyProps()}>
                    {page.map((row) => {
                        prepareRow(row);
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map((cell) => (
                                    <td {...cell.getCellProps()} className="table-td">
                                        {cell.render("Cell")}
                                    </td>
                                ))}
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>

            <div className="md:flex md:space-y-0 space-y-5 justify-between mt-6 items-center">
                <div className=" flex items-center space-x-3 rtl:space-x-reverse">
            <span className=" flex space-x-2  rtl:space-x-reverse items-center">
              <span className=" text-sm font-medium text-slate-600 dark:text-slate-300">
                Go
              </span>
              <span>
                <input
                    type="number"
                    className=" form-control py-2"
                    defaultValue={pageIndex + 1}
                    onChange={(e) => {
                        const pageNumber = e.target.value
                            ? Number(e.target.value) - 1
                            : 0;
                        gotoPage(pageNumber);
                    }}
                    style={{ width: "50px" }}
                />
              </span>
            </span>
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Page{" "}
                        <span>
                {pageIndex + 1} of {pageOptions.length}
              </span>
            </span>
                </div>
                <ul className="flex items-center  space-x-3  rtl:space-x-reverse">
                    <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                        <button
                            className={
                                    !canPreviousPage ? "opacity-50 cursor-not-allowed" : ""
                                }
                            onClick={() => previousPage()}
                            disabled={!canPreviousPage}
                        >
                            <Icon icon="heroicons-outline:chevron-left" />
                        </button>
                    </li>
                    {pageOptions.map((page, pageIdx) => (
                        <li key={pageIdx}>
                            <button
                                aria-current="page"
                                className={
                                        pageIdx === pageIndex
                                            ? "bg-slate-900 dark:bg-slate-600  dark:text-slate-200 text-white font-medium "
                                            : "bg-slate-100 dark:bg-slate-700 dark:text-slate-400 text-slate-900  font-normal  "
                                    +
                                           "text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150" }
                                onClick={() => gotoPage(pageIdx)}
                            >
                                {page + 1}
                            </button>
                        </li>
                    ))}
                    <li className="text-xl leading-4 text-slate-900 dark:text-white rtl:rotate-180">
                        <button
                            className={
                                    !canNextPage ? "opacity-50 cursor-not-allowed" : ""
                                }
                            onClick={() => nextPage()}
                            disabled={!canNextPage}
                        >
                            <Icon icon="heroicons-outline:chevron-right" />
                        </button>
                    </li>
                </ul>
            </div>
        </Card>
);
};
export default GameList;
