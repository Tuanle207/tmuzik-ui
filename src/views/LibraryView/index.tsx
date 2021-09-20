import { FC } from 'react';
import { ViewWrapper } from '../../components';

interface ILibraryViewProps {

}

export const LibraryView:FC<ILibraryViewProps> = () => {

  return (
    <ViewWrapper title="Thư viện">
      <div>
        library
      </div>
    </ViewWrapper>
  );
};