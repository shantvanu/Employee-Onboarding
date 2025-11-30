// src/features/form/DynamicFormPage.jsx
import { useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from '@tanstack/react-form';
import { useNavigate } from 'react-router-dom';
import {
  getFormSchema,
  createSubmission,
} from '../../api/formApi.js';
import { buildDefaultValues, buildValidator } from './formUtils.js';
import FieldRenderer from './FieldRenderer.jsx';
import Spinner from '../../components/ui/Spinner.jsx';
import Button from '../../components/ui/Button.jsx';
import Alert from '../../components/feedback/Alert.jsx';
import Toast from '../../components/ui/Toast.jsx';

export default function DynamicFormPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const {
    data: schema,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['formSchema'],
    queryFn: getFormSchema,
  });

  const mutation = useMutation({
    mutationFn: createSubmission,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['submissions'] });
      setShowSuccessToast(true);
      setTimeout(() => {
        if (schema) {
          form.reset(buildDefaultValues(schema));
        }
        navigate('/submissions');
      }, 1500);
    },
  });

  const form = useForm({
    defaultValues: {},
    onSubmit: async ({ value }) => {
      try {
        const res = await mutation.mutateAsync(value);
        if (res.success) {
          // Success handled in onSuccess callback
        }
      } catch (err) {
        // Error handling is done via mutation.error
      }
    },
  });


  // Update form default values when schema loads
  useEffect(() => {
    if (schema) {
      const defaults = buildDefaultValues(schema);
      form.reset(defaults);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schema]);

  if (isLoading) return <Spinner />;

  if (isError)
    return (
      <Alert type="error">
        Failed to load form schema: {error?.message || 'Unknown error'}
      </Alert>
    );

  if (!schema) return null;

  const serverErrors =
    mutation.error?.response?.data?.errors || mutation.error?.errors;

  return (
    <>
      {showSuccessToast && (
        <Toast
          message="Submission created successfully!"
          type="success"
          onClose={() => setShowSuccessToast(false)}
        />
      )}
      <div className="mx-auto max-w-2xl rounded-xl bg-white p-6 shadow-sm dark:bg-slate-900">
        <h1 className="mb-1 text-lg font-semibold">{schema.title}</h1>
        <p className="mb-4 text-xs text-slate-600 dark:text-slate-300">
          {schema.description}
        </p>

        {mutation.isError && (
          <Alert type="error">
            {mutation.error?.response?.data?.message ||
              'Submission failed. Please check the errors.'}
          </Alert>
        )}

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
              const serverError = serverErrors?.[field.name];

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
                  {serverError && (
                    <p className="text-[11px] text-rose-500">{serverError}</p>
                  )}
                </div>
              );
            }}
          />
        ))}

        <form.Subscribe
          selector={(state) => ({
            values: state.values,
            isSubmitting: state.isSubmitting,
          })}
        >
          {({ values, isSubmitting }) => {
            // Check if form is valid
            const isFormValid = () => {
              if (!schema) return false;
              
              // Check all required fields are filled
              const requiredFields = schema.fields.filter((f) => f.required);
              const hasAllRequired = requiredFields.every((field) => {
                const value = values[field.name];
                if (field.type === 'multi-select') {
                  return Array.isArray(value) && value.length > 0;
                }
                if (field.type === 'switch') {
                  return value !== undefined && value !== null;
                }
                if (field.type === 'number') {
                  return value !== '' && value !== null && value !== undefined && !isNaN(Number(value));
                }
                return value !== '' && value !== null && value !== undefined && (typeof value !== 'string' || value.trim() !== '');
              });
              
              return hasAllRequired;
            };
            
            return (
              <div className="flex items-center gap-3 pt-2">
                <Button
                  type="submit"
                  disabled={mutation.isPending || !isFormValid()}
                >
                  {mutation.isPending ? 'Submitting…' : 'Submit'}
                </Button>
              </div>
            );
          }}
        </form.Subscribe>
      </form>
    </div>
    </>
  );
}
