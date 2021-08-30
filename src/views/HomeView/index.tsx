import { FC } from 'react';
import { Playlist, ViewWrapper } from '../../components';
import styles from './index.module.scss';

interface IHomeViewProps { }



export const HomeView: FC<IHomeViewProps> = () => {

  return (
    <ViewWrapper className={styles.root}>
      <Playlist />
    </ViewWrapper>
  )
};