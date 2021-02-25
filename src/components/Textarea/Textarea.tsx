import cn from 'classnames';
import { DetailedHTMLProps, ForwardedRef, forwardRef, TextareaHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

import styles from './Textarea.module.css';

interface TextareaProps extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
  error?: FieldError;
}

export const Textarea = forwardRef(
  function Textarea({ className, error, ...props }: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element {
    return (
      <div className={cn(styles.textareaWrapper, className)}>
        <textarea className={cn(styles.textarea, {
          [styles.error]: error,
        })} ref={ref} {...props} />
        {error && <span className={styles.errorMessage} role='alert'>{error.message}</span>}
      </div>
    );
  }
);
