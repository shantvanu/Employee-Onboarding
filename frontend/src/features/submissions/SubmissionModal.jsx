// src/features/submissions/SubmissionModal.jsx
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getFormSchema } from '../../api/formApi.js';
import Modal from '../../components/ui/Modal.jsx';
import Button from '../../components/ui/Button.jsx';
import FieldRenderer from '../form/FieldRenderer.jsx';
import { useForm } from '@tanstack/react-form';
import { buildValidator } from '../form/formUtils.js';

export default function SubmissionModal({ submission, open, onClose, onSave }) {
  const [isEditing, setIsEditing] = useState(false);
  const { data: schema } = useQuery({
    queryKey: ['formSchema'],
    queryFn: getFormSchema,
    enabled: isEditing && !!submission,
  });

  const form = useForm({
    defaultValues: submission?.data || {},
    onSubmit: async ({ value }) => {
      if (onSave) {
        await onSave(value);
        setIsEditing(false);
        onClose();
      }
    },
  });

  useEffect(() => {
    if (submission && isEditing && schema) {
      form.reset(submission.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submission, isEditing, schema]);

  if (!submission) return null;

  if (isEditing && schema) {
    return (
      <Modal title="Edit Submission" open={open} onClose={onClose}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
          className="space-y-4"
        >
          {schema.fields.map((field) => (
            <form.Field
              key={field.name}
              name={field.name}
              validators={{
                onChange: buildValidator(field),
              }}
              children={(fieldApi) => {
                const meta = fieldApi.state.meta;
                const errorMsg = meta.errors[0];

                return (
                  <div className="space-y-1">
                    <label className="flex items-center gap-1 text-xs font-medium">
                      {field.label}
                      {field.required && (
                        <span className="text-[10px] font-semibold text-rose-500">
                          *
                        </span>
                      )}
                    </label>
                    <FieldRenderer fieldDef={field} fieldApi={fieldApi} />
                    {errorMsg && (
                      <p className="text-[11px] text-rose-500">{errorMsg}</p>
                    )}
                  </div>
                );
              }}
            />
          ))}
          <div className="flex items-center gap-2 pt-2">
            <Button type="submit" disabled={form.state.isSubmitting}>
              {form.state.isSubmitting ? 'Saving...' : 'Save'}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    );
  }

  return (
    <Modal title="Submission Details" open={open} onClose={onClose}>
      <div className="space-y-3">
        <div>
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
            Submission ID:
          </span>
          <p className="mt-0.5 text-sm font-mono">{submission.id}</p>
        </div>
        <div>
          <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
            Created At:
          </span>
          <p className="mt-0.5 text-sm">
            {new Date(submission.createdAt).toLocaleString()}
          </p>
        </div>
        <div className="border-t border-slate-200 pt-3 dark:border-slate-700">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              Form Data:
            </span>
            {onSave && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </Button>
            )}
          </div>
          <div className="mt-2 space-y-2">
            {Object.entries(submission.data || {}).map(([key, value]) => (
              <div key={key} className="rounded bg-slate-50 p-2 dark:bg-slate-800">
                <div className="text-xs font-medium text-slate-700 dark:text-slate-300">
                  {key}
                </div>
                <div className="mt-0.5 text-sm text-slate-900 dark:text-slate-100">
                  {Array.isArray(value) ? value.join(', ') : String(value)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
}

