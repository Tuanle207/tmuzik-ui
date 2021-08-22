import { FC } from 'react';
import { IData, PlaylistItem } from './PlaylistItem';
import styles from './index.module.scss';



interface IPlaylistProps {
  data?: IData[];
  render?: (data: IData) => JSX.Element;
}

export const Playlist: FC<IPlaylistProps> = ({
  data = [1,2,3,4,5,6,7,8,9].map((id) => ({
    id: `${id}`,
    name: `Audio name ${id}`,
    photo: 'https://play-lh.googleusercontent.com/mOkjjo5Rzcpk7BsHrsLWnqVadUK1FlLd2-UlQvYkLL4E9A0LpyODNIQinXPfUMjUrbE',
    artist: `Artist name ${id}`,
    album: `Album name ${id}`,
    length: 287,
    creationTime: `2021-08-21T02:37:28.370Z`,
    creationUser: `Lê Anh Tuấn`,
  })),
  render = (data) => <PlaylistItem key={data.id} data={data}/>
}) => {

  return (
    <div className={styles.container}>
      <div className={styles.list}>
        {
          data.map((el) => render(el))
        }
      </div>
    </div>
  );
};