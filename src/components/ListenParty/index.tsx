import { FC, useState } from 'react';
import { useContextMenu } from 'react-contexify';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Modal } from '..';
import { Icon } from '../../assets';
import { uiAction } from '../../store/actions';
import { uiSelector } from '../../store/selectors';
import { IconButton } from '../IconButton';
import styles from './index.module.scss';


import 'react-contexify/dist/ReactContexify.css';
import { LISTEN_PARTY_MENU, ParticipantsBox, StartNewPartyBox } from './components';

interface IListenPartyProps { }

export const ListenParty: FC<IListenPartyProps> = () => {

  const [ showParticipantModal, setShowParticipantModal ] = useState(false);
  const [ activeParticipantModalTabIndex, setActiveParticipantModalTabIndex ] = useState(0);
  const [ showStartNewListenPartyModal, setShowStartNewListenPartyModal ] = useState(false);
  
  const { show } = useContextMenu({
    id: LISTEN_PARTY_MENU,
    props: {
      callback: () => {
        setShowParticipantModal(true);
        setActiveParticipantModalTabIndex(1);
      }
    }
  });

  const dispatch = useDispatch();
  const showListenParty = useSelector(uiSelector.showListenParty);

  const onParticipantClicked = () => {
    setActiveParticipantModalTabIndex(0);
    setShowParticipantModal(true);
  };

  const onStartNewPartyClicked = () => {
    setShowStartNewListenPartyModal(true);
  };

  const onCloseClicked = () => {
    dispatch(uiAction.setListenPartyBoxDisplay(false));
  };

  const onOptionsClicked = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    show(e);
  };

  return (
    <div
      className={[styles.container, showListenParty ? styles.containerActive : ''].join(' ')}
    >
      <Modal
        isOpen={showParticipantModal}
        onRequestClose={() => setShowParticipantModal(false)}
      >
        <ParticipantsBox activeTabIndex={activeParticipantModalTabIndex} />
      </Modal>
      <Modal
        isOpen={showStartNewListenPartyModal}
        onRequestClose={() => setShowStartNewListenPartyModal(false)}
        title="Tạo buổi nghe chung"
      >
        <StartNewPartyBox />
      </Modal>
        
      <div className={styles.header}>
        <IconButton
          className={styles.iconButton}
          onClick={onOptionsClicked}
        >
          <Icon.ThreeDot />
        </IconButton>
        <IconButton
          className={[styles.iconButton, styles.participantButton].join(' ')}
          onClick={onParticipantClicked}
        >
          <Icon.Friends />
        </IconButton>
        <IconButton
          className={[styles.iconButton, styles.closeButton].join(' ')}
          onClick={onCloseClicked}
        >
          <Icon.CarretDown />
        </IconButton>
      </div>
      <div className={styles.unavailable}>
        <p>Bạn chưa tham gia buổi nghe chung nào!</p>
        <Button title="Tạo buổi nghe chung"  onClick={onStartNewPartyClicked} />
      </div>
    </div>
  );
};