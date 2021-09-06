import { push } from 'connected-react-router';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import styles from './index.module.scss';

interface ILinkProps {
  to?: string;
}

export const Link: FC<ILinkProps> = ({
  to = '/',
  children
}) => {

  const dispatch = useDispatch();

  const onClicked = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    dispatch(push(to));
  }

  return (
    <a href={ to } className={styles.root} onClick={onClicked}>
    {
      children
    }
    </a>
  );
};