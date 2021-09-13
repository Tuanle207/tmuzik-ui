import { FC } from 'react';
import { SignupForm } from './SignupForm';
import styles from './index.module.scss';

interface ISignupViewProps {

}

export const SignupView: FC<ISignupViewProps> = () => {

  return (
    <div className={styles.container}>
      <SignupForm />
    </div>
  );
};