// src/features/submissions/SubmissionsPage.jsx
import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getSubmissions,
  deleteSubmission,
  updateSubmission,
  downloadCsv,
  searchSubmissions,
} from '../../api/formApi.js';
import { usePaginationParams } from '../../hooks/usePaginationParams.jsx';
import SubmissionTable from './SubmissionTable.jsx';
import SubmissionModal from './SubmissionModal.jsx';
import Button from '../../components/ui/Button.jsx';
import Alert from '../../components/feedback/Alert.jsx';
import Spinner from '../../components/ui/Spinner.jsx';
import Toast from '../../components/ui/Toast.jsx';
import { useDebounce } from '../../hooks/useDebounce.jsx';

export default function SubmissionsPage() {
  const queryClient = useQueryClient();
  const { page, limit, sortOrder, setPage, setLimit, setSortOrder } =
    usePaginationParams();
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSubmission, setEditingSubmission] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 500);

  // Debug: search changes
  console.log('Search query', { searchQuery, debouncedSearch, page, limit, sortOrder });

  const {
    data: submissionsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['submissions', page, limit, sortOrder, debouncedSearch],
    queryFn: async () => {
      if (debouncedSearch) {
        const searchRes = await searchSubmissions(debouncedSearch);
        // For search, we'll show all results but still paginate client-side
        const start = (page - 1) * limit;
        const end = start + limit;
        const items = searchRes.items || [];
        return {
          success: true,
          page,
          limit,
          totalPages: Math.ceil(items.length / limit),
          totalCount: items.length,
          items: items.slice(start, end),
        };
      }
      return getSubmissions({ page, limit, sortOrder });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteSubmission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
      setSuccessMessage('Submission deleted successfully!');
      setShowSuccessToast(true);
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => updateSubmission(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
      setEditingSubmission(null);
      setSuccessMessage('Submission updated successfully!');
      setShowSuccessToast(true);
    },
  });

  const handleView = useCallback((submission) => {
    setSelectedSubmission(submission);
    setIsModalOpen(true);
    console.log('View submission', submission);
  }, []);

  const handleEdit = useCallback((submission) => {
    setEditingSubmission(submission);
    setIsModalOpen(true);
  }, []);

  const handleDelete = useCallback(
    async (id) => {
      if (window.confirm('Are you sure you want to delete this submission?')) {
        await deleteMutation.mutateAsync(id);
        console.log('Delete requested for submission id:', id);
      }
    },
    [deleteMutation]
  );

  const handleExportCsv = useCallback(async () => {
    try {
      const blob = await downloadCsv();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `submissions-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Failed to export CSV:', err);
    }
  }, []);

  if (isError) {
    return (
      <Alert type="error">
        Failed to load submissions: {error?.message || 'Unknown error'}
      </Alert>
    );
  }

  const submissions = submissionsData?.items || [];
  const totalPages = submissionsData?.totalPages || 0;
  const totalCount = submissionsData?.totalCount || 0;

  return (
    <>
      {showSuccessToast && (
        <Toast
          message={successMessage}
          type="success"
          onClose={() => setShowSuccessToast(false)}
        />
      )}
      <div className="mx-auto max-w-6xl rounded-xl bg-white p-6 shadow-sm dark:bg-slate-900">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="mb-1 text-lg font-semibold">Submissions</h1>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            Total: {totalCount} submission{totalCount !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          />
          <Button variant="outline" size="sm" onClick={handleExportCsv}>
            Export CSV
          </Button>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
            Items per page:
          </label>
          <select
            value={limit}
            onChange={(e) => setLimit(Number(e.target.value))}
            className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-slate-700 dark:text-slate-300">
            Sort by:
          </label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100"
          >
            <option value="desc">Newest First</option>
            <option value="asc">Oldest First</option>
          </select>
        </div>
      </div>

      <SubmissionTable
        data={submissions}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        isLoading={isLoading}
      />

      {deleteMutation.isError && (
        <Alert type="error" className="mt-4">
          Failed to delete submission
        </Alert>
      )}

      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-xs text-slate-600 dark:text-slate-400">
            Page {page} of {totalPages}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page + 1)}
              disabled={page >= totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}

      <SubmissionModal
        submission={editingSubmission || selectedSubmission}
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedSubmission(null);
          setEditingSubmission(null);
        }}
        onSave={
          editingSubmission
            ? (data) =>
                updateMutation.mutate({ id: editingSubmission.id, data })
            : null
        }
      />
    </div>
    </>
  );
}
