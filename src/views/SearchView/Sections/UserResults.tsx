import { FC } from 'react';
import { useSelector } from 'react-redux';
import { CardList, Typography } from '../../../components';
import { searchSelector } from '../../../store/selectors';
import styles from './index.module.scss';

interface IUserResultsProps { }

export const UserResults: FC<IUserResultsProps> = () => {

  const users = useSelector(searchSelector.usersTopResult);

  return (
    <div className={styles.section}>
      <div className={styles.about}>
        <Typography variant="h3" className={styles.title}>
          Người dùng
        </Typography> 
      </div>
      <CardList
        data={users.map((el) => ({
          id: el.id,
          title: el.name,
          cover: el.avatar,
          subTitle: 'Hồ sơ'
        }))}
      />
    </div>
  );
};