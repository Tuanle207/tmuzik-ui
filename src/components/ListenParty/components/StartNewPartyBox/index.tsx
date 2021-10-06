import { FC, useState } from 'react';
import { RemovableUserCard } from '..';
import { Button, CheckGroup, TextField, Typography } from '../../..';
import styles from './index.module.scss';

interface IStartNewPartyBoxProps { }

export const StartNewPartyBox: FC<IStartNewPartyBoxProps> = () => {

  const [ activeTabIndex, setActiveTabIndex ] = useState(0);
  const [ selectedIdValues, setSelectedIdValues ] = useState<string[]>();
  const [ people, setPeople ] = useState<API.SimpleUserProfile[]>([]);

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <div
          className={[styles.tabItem, activeTabIndex === 0 ? styles.tabActiveItem : ''].join(' ')}
          onClick={() => setActiveTabIndex(0)}
        >
          <p>Chọn người mời tham gia</p>
        </div>
        <div
          className={[styles.tabItem, activeTabIndex === 1 ? styles.tabActiveItem : ''].join(' ')}
          onClick={() => setActiveTabIndex(1)}
        >
          <p>Thiết lập</p>
        </div>
      </div>
      <div className={styles.tabContent}>
      {
        activeTabIndex === 0 && (
        <>
          <TextField
            className={styles.input}
            id="search-people"
            variant="search-bar"
            placeholder="Enter a follower or following's name..."
          />
          <div className={styles.selectedPeople}>
            <RemovableUserCard className={styles.selectedItem} id="lat" name="Le hoang anh tuan" />
            <RemovableUserCard className={styles.selectedItem} id="lat" name="Le hoang anh tuan" />
            <RemovableUserCard className={styles.selectedItem} id="lat" name="Le hoang anh tuan" />
            <RemovableUserCard className={styles.selectedItem} id="lat" name="Le hoang anh tuan" />
            <RemovableUserCard className={styles.selectedItem} id="lat" name="Le hoang anh tuan" />
            <RemovableUserCard className={styles.selectedItem} id="lat" name="Le hoang anh tuan" />
            <RemovableUserCard className={styles.selectedItem} id="lat" name="Le hoang anh tuan" />
            <RemovableUserCard className={styles.selectedItem} id="lat" name="Le hoang anh tuan" />
            <RemovableUserCard className={styles.selectedItem} id="lat" name="Le hoang anh tuan" />
          </div>
          <div className={styles.searchResult}>
            <Typography variant="p2" >Kết quả tìm kiếm</Typography>
            <CheckGroup
              className={styles.checkgroup}
            />
          </div>
          <div className={styles.action}>
            <Button className={styles.startButton} title="Bắt đầu" />
          </div>
        </>
        )
      }
      {
        activeTabIndex === 1 && (
        <>
          <div className={styles.searchResult}>
            <CheckGroup
              className={styles.checkgroup}
            />
          </div>
          <div className={styles.action}>
            <Button className={styles.startButton} title="Bắt đầu" />
          </div>
        </>
        )
      }
      </div>
    </div>
  );
};