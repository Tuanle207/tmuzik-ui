import { FC, useCallback } from 'react';
import { Button } from '../../../components';
import { useDropzone } from 'react-dropzone';
import styles from './index.module.scss';
import { Icon } from '../../../assets';

interface IUploadProps { 
  onSuccess?: (file: File) => void;
}

const FileSelector: FC<IUploadProps> = ({
  onSuccess = () => {}
}) => {

  const onDropped = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onSuccess(acceptedFiles[0]);
    }
  }, [onSuccess])

  const { getRootProps, getInputProps, open: openFileDialog, isDragActive } = useDropzone({ 
    onDrop: onDropped,
    noClick: true,
    accept: 'audio/*'
  });

  return (
    <div className={[ styles.container, isDragActive ? styles.dragActive : ''].join(' ')} 
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <Icon.Music className={styles.icon} />
      <p className={styles.dropText}>Drag and drop your audio here</p>
      <Button 
        title="or chose file to upload" 
        onClick={openFileDialog} 
      />
    </div>
  );
};

export default FileSelector;