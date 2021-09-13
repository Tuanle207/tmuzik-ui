import { FC, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Button, CardCover, IModalProps, Modal, TextArea, TextField } from '../../../components';
import { playlistAction, taskStateAction } from '../../../store/actions';
import { taskStateSelectorCreator } from '../../../utils/selectorCreators';
import styles from './index.module.scss';

interface IUpdatePlaylistModalProps extends IModalProps {
  initData: IUpdatePlaylistFormDataInit;
  handleClose: () => void;
}

interface IUpdatePlaylistFormDataInit {
  id: string;
  name: string;
  description?: string;
  cover?: string;
}

interface IUpdatePlaylistFormData {
  name: string;
  description: string;
}

export const UpdatePlaylistModal: FC<IUpdatePlaylistModalProps> = ({
  initData,
  isOpen,
  handleClose,
  shouldCloseOnOverlayClick = true,
  ...rest
}) => {

  const fileInputRef = useRef<HTMLInputElement>(null);

  const { control, handleSubmit, formState: { errors, isDirty }, reset } = useForm<IUpdatePlaylistFormData>();

  const [ coverFile, setCoverFile ] = useState<File>();
  const [ notifyIsDirty, setNotifyIsDirty] = useState(false);

  const dispatch = useDispatch();
  const updatePlaylistState = useSelector(
    taskStateSelectorCreator(taskStateAction.updatePlaylist.toString()));

  useEffect(() => {
    reset({
      name: initData.name,
      description: initData.description
    });
    setCoverFile(undefined);
  }, [ initData, reset ]);
  
  useEffect(() => {
    if (updatePlaylistState.state === 'success') {
      handleClose();
      dispatch(taskStateAction.updatePlaylist({state: 'idle'}));
    }
  }, [ updatePlaylistState, notifyIsDirty, dispatch, handleClose ]);

  const onRequestClose = () => {
    if (isDirty) {
      setNotifyIsDirty(true);
    } else {
      handleClose();
    }
  };

  const onCoverEditClick = () => {
    fileInputRef.current?.click();
  };

  const onFileChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files || [];
    if (files?.length > 0) {
      setCoverFile(files[0]);
    }
  };

  const onSubmitClicked = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const handle = handleSubmit(onSubmit);
    handle(e);
  };

  const onSubmit = async (data: IUpdatePlaylistFormData) => {
    const input: API.UpdatePlaylistRequest = {
      id: initData.id,
      name: data.name,
      description: data.description,
      cover: coverFile
    };
    dispatch(playlistAction.updatePlaylist(input));
  };

  const objUrl = coverFile ? URL.createObjectURL(coverFile) : undefined;

  return (
    <Modal
      title="Cập nhật thông tin"
      isOpen={isOpen} 
      shouldCloseOnOverlayClick={shouldCloseOnOverlayClick}
      onRequestClose={onRequestClose}
      className={styles.container}
      confirmBeforeExit={notifyIsDirty}
      {...rest}
    > 
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
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
        <Button
          loading={updatePlaylistState.state === 'processing'} 
          title="Lưu"
          variant="round"
          onClick={onSubmitClicked}
        />
      </div>
    </Modal>
  );
};