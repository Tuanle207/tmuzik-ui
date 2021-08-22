import { FC } from 'react';
import { MainView } from '../../components';
import styles from './index.module.scss';

interface IHomeViewProps { }

export const HomeView: FC<IHomeViewProps> = () => {

  return (
    <MainView>
      <div className={styles.container}>
        main page
      </div>
    </MainView>
  )
};