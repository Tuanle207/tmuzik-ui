import { FC, useState } from 'react';
import { TextField } from '../../..';
import { Icon } from '../../../../assets';
import { IconButton } from '../../../IconButton';
import { UserCard } from '../UserCard';
import styles from './index.module.scss';

interface IParticipantsBoxProps {
  activeTabIndex?: number;
}

export const ParticipantsBox: FC<IParticipantsBoxProps> = ({
  activeTabIndex = 0
}) => {

  const [ activeModalTabIndex, setActiveModalTabIndex ] = useState(activeTabIndex);

  return (
    <div className={styles.container}>
      <div className={styles.tabs}>
        <div
          className={[styles.tabItem, activeModalTabIndex === 0 ? styles.tabActiveItem : ''].join(' ')}
          onClick={() => setActiveModalTabIndex(0)}
        >
          <p>Người tham gia</p>
        </div>
        <div
          className={[styles.tabItem, activeModalTabIndex === 1 ? styles.tabActiveItem : ''].join(' ')}
          onClick={() => setActiveModalTabIndex(1)}
        >
          <p>Thêm người nghe</p>
        </div>
      </div>
      <div className={styles.tabModalContent}>
      {
        activeModalTabIndex === 0 && (
          <ul className={styles.list}>
            <li className={styles.listItem}>
              <UserCard name={"Lê Anh Tuấn"} note={"Thêm bởi bạn"} />
              <IconButton
                className={styles.removeParticipantButton}
              >
                <Icon.Close />
              </IconButton>
            </li>
            <li className={styles.listItem}>
              <UserCard name={"Nguyễn Xuân Tú"} note={"Thêm bởi bạn"} />
              <IconButton
                className={styles.removeParticipantButton}
              >
                <Icon.Close />
              </IconButton>
            </li>
            <li className={styles.listItem}>
              <UserCard name={"Lê Xuân Tùng"} />
              <IconButton
                className={styles.removeParticipantButton}
              >
                <Icon.Close />
              </IconButton>
            </li>
            <li className={styles.listItem}>
              <UserCard name={"Nguyễn Thanh Tuấn"} note={"Thêm bởi bạn"} />
              <IconButton
                className={styles.removeParticipantButton}
              >
                <Icon.Close />
              </IconButton>
            </li>
            <li className={styles.listItem}>
              <UserCard name={"Nguyễn Thanh Tuấn"} note={"Thêm bởi bạn"} />
              <IconButton
                className={styles.removeParticipantButton}
              >
                <Icon.Close />
              </IconButton>
            </li>
            <li className={styles.listItem}>
              <UserCard name={"Nguyễn Thanh Tuấn"} note={"Thêm bởi bạn"} />
              <IconButton
                className={styles.removeParticipantButton}
              >
                <Icon.Close />
              </IconButton>
            </li>
            <li className={styles.listItem}>
              <UserCard name={"Nguyễn Thanh Tuấn"} note={"Thêm bởi bạn"} />
              <IconButton
                className={styles.removeParticipantButton}
              >
                <Icon.Close />
              </IconButton>
            </li>
            <li className={styles.listItem}>
              <UserCard name={"Nguyễn Thanh Tuấn"} note={"Thêm bởi bạn"} />
              <IconButton
                className={styles.removeParticipantButton}
              >
                <Icon.Close />
              </IconButton>
            </li>
          </ul>
        ) 
      }
      {
        activeModalTabIndex === 1 && (
          <>
            <div className={styles.inputWrapper}>
              <TextField
                id="participant-search"
                variant="search-bar"
                className={styles.input}
                placeholder="Enter a follower or following's name..."
              />
            </div>
            <ul className={styles.list}>
              <li className={styles.listItem}>
                <UserCard name={"Lê Anh Tuấn"} note={"Thêm bởi bạn"} />
                <IconButton
                  className={styles.removeParticipantButton}
                >
                  <Icon.Invite className={styles.addParticipantIcon} />
                </IconButton>
              </li>
              <li className={styles.listItem}>
                <UserCard name={"Nguyễn Xuân Tú"} note={"Thêm bởi bạn"} />
                <IconButton
                  className={styles.removeParticipantButton}
                >
                  <Icon.Invite className={styles.addParticipantIcon} />
                </IconButton>
              </li>
              <li className={styles.listItem}>
                <UserCard name={"Lê Anh Tuấn"} note={"Thêm bởi bạn"} />
                <IconButton
                  className={styles.removeParticipantButton}
                >
                  <Icon.Invite className={styles.addParticipantIcon} />
                </IconButton>
              </li>
              <li className={styles.listItem}>
                <UserCard name={"Nguyễn Xuân Tú"} note={"Thêm bởi bạn"} />
                <IconButton
                  className={styles.removeParticipantButton}
                >
                  <Icon.Invite className={styles.addParticipantIcon} />
                </IconButton>
              </li>
              <li className={styles.listItem}>
                <UserCard name={"Lê Anh Tuấn"} note={"Thêm bởi bạn"} />
                <IconButton
                  className={styles.removeParticipantButton}
                >
                  <Icon.Invite className={styles.addParticipantIcon} />
                </IconButton>
              </li>
              <li className={styles.listItem}>
                <UserCard name={"Nguyễn Xuân Tú"} note={"Thêm bởi bạn"} />
                <IconButton
                  className={styles.removeParticipantButton}
                >
                  <Icon.Invite className={styles.addParticipantIcon} />
                </IconButton>
              </li>
            </ul>
          </>
        ) 
      }
      </div>
    </div>
  );
};