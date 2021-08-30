import { FC, useState } from 'react';
import { ViewWrapper } from '../../components';
import FileSelector from './FileSelector';
import Uploader, { IAudioMetadata } from './Uploader';
import { parseBlob } from 'music-metadata-browser';
import UploadSuccess from './UploadSuccess';

interface IUploadViewProps { }

enum UploadStatus {
  SelectFile,
  Upload,
  Success
}

export const UploadView: FC<IUploadViewProps> = () => {

  const [ file, setFile ] = useState<File | null>(null);
  const [ uploadStatus, setUploadStatus ] = useState<UploadStatus>(UploadStatus.SelectFile);
  const [ metadata, setMetadata ] = useState<IAudioMetadata>({
    name: '',
    artist: '',
    description: '',
    genre: '',
    cover: null,
    duration: 0,
    album: ''
  });

  const onFileSelectDone = async (file: File) => {

    setFile(file);
    
    const { common, format: { duration } } = await parseBlob(file);
    setMetadata({
      name: common.title || '',
      artist: common.artist || '',
      description: common.description && common.description.length > 0 ? common.description[0] : '',
      genre: common.genre && common.genre.length > 0 ? common.genre[0] : '',
      cover: common.picture && common.picture.length > 0 ? common.picture[0] : null,
      duration: Math.ceil(duration || 0),
      album: common.album || ''
    });

    setUploadStatus(UploadStatus.Upload);
  };

  const onUploadCancelled = () => {
    setFile(null);
    setUploadStatus(UploadStatus.SelectFile);
  };

  const onUploadSuccess = () => {
    setFile(null);
    setUploadStatus(UploadStatus.Success);
  };

  const onContinueUpload = () => {
    setUploadStatus(UploadStatus.SelectFile);
  };

  return (
    <ViewWrapper>
      {
        uploadStatus === UploadStatus.SelectFile && (
          <FileSelector 
            onSuccess={onFileSelectDone} 
          />
        )
      }
      {
        uploadStatus === UploadStatus.Upload && (
          <Uploader 
            selectedFile={file!}
            onCancel={onUploadCancelled}
            onSuccess={onUploadSuccess}
            metadata={metadata}
          />
        )
      }
      {
        uploadStatus === UploadStatus.Success && (
          <UploadSuccess onContinue={onContinueUpload} />
        )
      }
    </ViewWrapper>
  );
};