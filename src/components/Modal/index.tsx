import { FC, useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { Typography } from '..';
import { Icon } from '../../assets';
import { IconButton } from '../IconButton';
import styles from './index.module.scss';

export interface IModalProps extends ReactModal.Props{ 
  title?: string;
  confirmBeforeExit?: boolean;
}

export const Modal: FC<IModalProps> = ({
  title = '',
  confirmBeforeExit = false,
  onRequestClose,
  className,
  children,
  ...rest
}) => {

  const [ warningNotified, setWarningNotified ] = useState(false);

  useEffect(() => {
    if (confirmBeforeExit && !warningNotified) {
      setWarningNotified(true);
    }
  }, [ confirmBeforeExit, warningNotified ]);

  const requestClose = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    if (confirmBeforeExit && !warningNotified) {
      return;
    }
    if (onRequestClose) {
      onRequestClose(e);
    }
  };

  return (
    <ReactModal 
      className={[styles.container, className ?? ''].join(' ')}
      {...rest}
      ariaHideApp={false}
    >
      <div className={styles.header}>
        <Typography variant="h3">
          { title }
        </Typography>
        <IconButton 
          className={styles.closeButton}
          onClick={requestClose}
        >
          <Icon.Close />
        </IconButton>
      </div>
      {
        confirmBeforeExit && (
          <div className={styles.confirmClose}>
            <Icon.Warning />
            <p>Press save to keep changes you've made.</p>
          </div>
        )
      }
      <div className={styles.content}>
      {
        children
      }
      </div>
    </ReactModal>
  );
};