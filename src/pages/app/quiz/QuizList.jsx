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
import {deleteQuiz, getQuizs, updateQuiz} from "@/Services/quizApi.js";
import Button from "@/components/ui/Button.jsx";
import {Link} from "react-router-dom";



const actions = [
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
            Header: "Name",
            accessor: "name",
            Cell: (row) => {
                return <span>{row?.cell?.value}</span>;
            },
        },
        {
            Header: "Subject",
            accessor: "subject",
            Cell: (row) => {
                return <span>{row?.cell?.value}</span>;
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
                                <span className="text-xl  text-center block w-full">
                                <Icon icon="heroicons-outline:dots-vertical" />
                            </span>
                            }
                        >
                            <div className="divide-y divide-slate-100 dark:divide-slate-800">
                                {actions.map((item, i) => (
                                    <Menu.Item key={i}>
                                        <div
                                            onClick={item.name === "delete" ? () => deletequiz(row.row.original.id) : () => {setEdit(()=>{return {show: true, quiz: row.row.original}})}}
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
    const [Edit, setEdit] = useState({
        show: false,
        quiz:{}
    });

    useEffect(() => {
        getQuizs().then((data) => {
            const formattedData = data.map((quiz) => ({
                id: quiz.id,
                name: quiz.name,
                subject: quiz.subject,
            }))
            setQuizes(formattedData);
        });
    }, []);

    function deletequiz(id){
        deleteQuiz(id).then(() =>  setQuizes(()=>{ return quizes.map((q) => q.id !== id )}))
    }
    function updatequiz(quiz){
        updateQuiz(quiz).then(() =>  setQuizes(()=>{ return quizes.map((q) => q.id === quiz.id ? quiz : q)}))
        setEdit({show: false, quiz: {}})
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
                    <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter}/>
                    <Link className="bg-slate-800 dark:border-white-300 text-white rounded-2xl px-4 py-2 "
                          to={"add"}>Add</Link>
                </div>
            </div>
            <div className="overflow-x-auto -mx-6">
                <table
                    className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700" {...getTableProps()}>
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
                    <tbody
                        className="bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700" {...getTableBodyProps()}>
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
                    style={{width: "50px"}}
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
                            <Icon icon="heroicons-outline:chevron-left"/>
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
                                        "text-sm rounded leading-[16px] flex h-6 w-6 items-center justify-center transition-all duration-150"}
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
                            <Icon icon="heroicons-outline:chevron-right"/>
                        </button>
                    </li>
                </ul>
            </div>
            {Edit.show && (
            <div id="authentication-modal" tabIndex="-1" aria-hidden="true"
                 className="flex items-center backdrop-blur justify-center overflow-y-auto overflow-x-hidden bottom-1 left-1  absolute w-full h-[calc(100%-1rem)] max-h-full">                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">

                        <div
                            className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Edit Quiz
                            </h3>
                            <button type="button"
                                    onClick={() => setEdit({show: false, quiz: {}})}
                                    className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                    data-modal-hide="authentication-modal">
                                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                     fill="none" viewBox="0 0 14 14">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                          strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                </svg>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>


                        <div className="p-4 md:p-5">
                            <form className="space-y-4" action="#">
                                <div>
                                    <label htmlFor="name"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Name</label>
                                    <input type="text" value={Edit.quiz.name} name="name" id="name"
                                           onChange={(e) => setEdit({...Edit, quiz: {...Edit.quiz, name: e.target.value}})}
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                           placeholder="Barcelona" required/>
                                </div>
                                <div>
                                    <label htmlFor="subject"
                                           className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Subject</label>
                                    <input type="text" value={Edit.quiz.subject}
                                           onChange={(e) => setEdit({...Edit, quiz: {...Edit.subject, name: e.target.value}})}
                                               name="subject" id="subject" placeholder="Football"
                                           className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                           required/>
                                </div>
                                <button type="submit"
                                        onClick={() => updatequiz(Edit.quiz)}
                                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            )}
        </Card>
    );
};
export default GameList;


