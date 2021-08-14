import { FC } from 'react';
import { LoginForm } from '../../components/LoginForm';
import styles from './index.module.scss';

interface ILoginViewProps {}

export const LoginView: FC<ILoginViewProps> = () => {
  
  return (
    <div className={styles.container}>
      <LoginForm />
    </div>
  );
};