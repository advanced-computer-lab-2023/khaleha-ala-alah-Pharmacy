import { FormikErrors, FormikTouched } from 'formik';

const DEFAULT_ERROR_CLASS = 'has-error';

export function hasErrorFactory<T = any>(
  touched: FormikTouched<T>,
  errors: FormikErrors<T>,
  errorClass = DEFAULT_ERROR_CLASS
) {
  return function (name: keyof T) {
    const hasError = errors[name];
    const isTouched = touched[name];

    if (isTouched && hasError) {
      return errorClass;
    }

    return null;
  };
}
