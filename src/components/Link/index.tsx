import { push } from 'connected-react-router';
import { FC } from 'react';
import { useDispatch } from 'react-redux';
import styles from './index.module.scss';

interface ILinkProps {
  to?: string;
  target?: "_blank";
}

export const Link: FC<ILinkProps> = ({
  to = '/',
  children,
  target,
}) => {

  const dispatch = useDispatch();

  const onClicked = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (target !== '_blank') {
      e.preventDefault();
      dispatch(push(to));
    }
  };

  return (
    <a href={ to } className={styles.root} onClick={onClicked} target={target} >
    {
      children
    }
    </a>
  );
};