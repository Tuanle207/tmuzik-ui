import { FC } from 'react';
import ReactModal from 'react-modal';
import styles from './index.module.scss';

interface IAlertDialogProps {
  show?: boolean;
  title?: string;
  detail?: string;
  onConfirm?: Function;
  onCancel?: Function;
  onClose?: Function;
}

export const AlertDialog: FC<IAlertDialogProps> = ({
  show = false,
  title = 'Are you sure to do this action?',
  detail = '',
  onConfirm = () => {},
  onCancel = () => {},
  onClose = () => {}
}) => {

  return show ? (
    <ReactModal
      isOpen={show}
      className={styles.container}
    >
      confirm?
    </ReactModal>
  ) : <></>;
};