// src/features/submissions/SubmissionTable.jsx
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from '@tanstack/react-table';
import Button from '../../components/ui/Button.jsx';

const columnHelper = createColumnHelper();

export default function SubmissionTable({
  data,
  onView,
  onEdit,
  onDelete,
  isLoading,
}) {
  const columns = [
    columnHelper.accessor('data.fullName', {
      header: 'Full Name',
      cell: (info) => (
        <span className="text-xs font-medium">{info.getValue() || '-'}</span>
      ),
    }),
    columnHelper.accessor('data.age', {
      header: 'Age',
      cell: (info) => (
        <span className="text-xs">{info.getValue() || '-'}</span>
      ),
    }),
    columnHelper.accessor('data.department', {
      header: 'Department',
      cell: (info) => (
        <span className="text-xs capitalize">{info.getValue() || '-'}</span>
      ),
    }),
    columnHelper.accessor('data.skills', {
      header: 'Skills',
      cell: (info) => {
        const skills = info.getValue();
        if (Array.isArray(skills) && skills.length > 0) {
          return (
            <span className="text-xs">
              {skills.slice(0, 2).join(', ')}
              {skills.length > 2 && ` +${skills.length - 2}`}
            </span>
          );
        }
        return <span className="text-xs">-</span>;
      },
    }),
    columnHelper.accessor('createdAt', {
      header: 'Created Date',
      cell: (info) => {
        const date = new Date(info.getValue());
        return (
          <span className="text-xs">
            {date.toLocaleDateString()} {date.toLocaleTimeString()}
          </span>
        );
      },
    }),
    columnHelper.display({
      id: 'actions',
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onView(row.original)}
          >
            View
          </Button>
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(row.original)}
            >
              Edit
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onDelete(row.original.id)}
              className="text-rose-600 hover:text-rose-700 dark:text-rose-400"
            >
              Delete
            </Button>
          )}
        </div>
      ),
    }),
  ];

  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-sky-500 border-t-transparent" />
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">
        No submissions found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="border-b border-slate-200 dark:border-slate-700"
            >
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-3 text-left text-xs font-semibold text-slate-700 dark:text-slate-300"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border-b border-slate-100 hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/50"
            >
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-4 py-3 text-sm text-slate-900 dark:text-slate-100"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

