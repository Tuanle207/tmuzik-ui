import { FC, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, CardCover, IModalProps, Modal, TextArea, TextField } from '../../../components';
import styles from './index.module.scss';

interface IUpdatePlaylistModalProps extends IModalProps {
  initData: API.PlaylistDetail | undefined;
}

interface IUpdatePlaylistFormData {
  name: string;
  description: string;
}

export const UpdatePlaylistModal: FC<IUpdatePlaylistModalProps> = ({
  initData,
  isOpen,
  shouldCloseOnOverlayClick = true,
  ...rest
}) => {

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { control, handleSubmit, formState: { errors } } = useForm<IUpdatePlaylistFormData>({
    defaultValues: {
      name: initData?.name,
      description: initData?.description,
    }
  });

  const [ coverFile, setCoverFile ] = useState<File | null>(null);

  useEffect(() => {
    console.log('fck it')
    console.log({initData});
  }, [initData]);

  const onCoverEditClick = () => {
    fileInputRef.current?.click();
  };

  const onFileChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files || [];
    if (files?.length > 0) {
      setCoverFile(files[0]);
    }
  };

  const objUrl = coverFile ? URL.createObjectURL(coverFile) : undefined;

  return (
    <Modal
      title="Cập nhật thông tin"
      isOpen={isOpen} 
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      className={styles.container}
      {...rest}
    > 
      <form className={styles.form}>
        <div className={styles.coverWrapper}>
          <CardCover
            editable
            onClick={onCoverEditClick}
            coverUrl={objUrl || initData?.cover}
          />
          <input ref={fileInputRef} hidden type="file" onChange={onFileChanged} />
        </div>
        <div className={styles.fields}>
          <div>
            <Controller
              name="name"
              control={control}
              rules={{
                required: true
              }}
              render={({ field: { value, onChange, onBlur } }) => <TextField
                id="name" 
                value={value}
                onValueChange={onChange}
                onBlur={onBlur}
                autoComplete="off"
                placeholder="Enter the name of the audio"
                validate={[
                  {
                    when: errors.name?.type === 'required',
                    message: 'Name is required!'
                  }
                ]}
              />}
            />
          </div>
          <div>
            <Controller 
              name="description"
              control={control}
              render={({ field: { value, onChange, onBlur } }) => <TextArea
                id="description"
                className={styles.input} 
                placeholder="Enter the description of the audio"
                value={value}
                onBlur={onBlur}
                onValueChange={onChange}
                lineCount={5}
              />}
            />
          </div>
        </div>
      </form>
      <div className={styles.actions}>
        <Button title="Lưu" variant="round" />
      </div>
    </Modal>
  );
};