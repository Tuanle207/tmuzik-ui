import { FC } from 'react';
import { Item, Menu, Separator } from 'react-contexify';

interface IListenPartyMenuProps { }

export const LISTEN_PARTY_MENU = "LISTEN_PARTY_MENU";

export const ListenPartyMenu: FC<IListenPartyMenuProps> = () => {

  const onAddParticipantClicked = ({props}: any) => {
    console.log('hello');
    const { callback = () => {} } = props;
    callback();
  } 

  const handleItemClick = () => {
    
  };

  return (
    <Menu id={LISTEN_PARTY_MENU}>
      <Item onClick={onAddParticipantClicked}>Thêm người nghe</Item>
      <Separator />
      <Item onClick={handleItemClick}>Rời khỏi buổi nghe chung</Item>
      <Item onClick={handleItemClick} disabled>Kết thúc buổi nghe chung</Item>
    </Menu>
  );
};