import cn from 'classnames';
import { DetailedHTMLProps, ForwardedRef, forwardRef, InputHTMLAttributes } from 'react';
import { FieldError } from 'react-hook-form';

import styles from './Input.module.css';

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  error?: FieldError;
}

export const Input = forwardRef(
  function Input({ className, error, ...props }: InputProps, ref:ForwardedRef<HTMLInputElement>): React.JSX.Element {
    return (
      <div className={cn(styles.inputWrapper, className)}>
        <input className={cn(styles.input, {
          [styles.error]: error,
        })} ref={ref} {...props} />
        {error && <span className={styles.errorMessage} role='alert'>{error.message}</span>}
      </div>
    );
  }
);
