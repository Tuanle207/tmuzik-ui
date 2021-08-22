import { FC } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './index.module.scss';


interface ILinkProps {
  to?: string;
}

export const Link: FC<ILinkProps> = ({
  to = '/',
  children
}) => {

  const history = useHistory();

  const onClicked = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault();
    history.push(to);
  }

  return (
    <a href={ to } className={styles.root} onClick={onClicked}>
    {
      children
    }
    </a>
  );
};