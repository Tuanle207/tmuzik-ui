import { FC } from 'react';
import { SquareCard } from '../Card';
import styles from './index.module.scss';

interface ICardData {
  id: string;
  cover?: string;
  title?: string;
  subTitle?: string;
}

interface ICardListProps {
  data?: ICardData[];
  render?: (data: ICardData) => JSX.Element;
}

export const CardList: FC<ICardListProps> = ({
  data = [1,2,3,4,5,6,7,8,9].map((index) => ({
    id: `${index}`,
    cover: 'https://media.macphun.com/img/uploads/customer/how-to/579/15531840725c93b5489d84e9.43781620.jpg?q=85&w=1340',
    subTitle: `Artist ${index}`,
    title: `Song ${index}` 
  })),
  render = (data) => <SquareCard key={data.id} cover={data.cover} subTitle={data.subTitle} title={data.title} />
}) => {

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {
          data.map((item) => render(item))
        }
      </div>
    </div>
  );
};