import { FC } from 'react';
import { MainView, Header } from '../../components';
import styles from './index.module.scss';

interface IHomeViewProps { }

export const HomeView: FC<IHomeViewProps> = () => {



  return (
    <MainView>
      <div className={styles.container}>
        <Header />
        <div className={styles.viewContent}>
          <div></div>
        </div>
      </div>
    </MainView>
  )
};