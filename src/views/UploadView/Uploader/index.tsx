import { FC, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IPicture } from 'music-metadata-browser';
import { Icon } from '../../../assets';
import { Button, RadioGroup, Select, TextArea, TextField } from '../../../components';
import { useDispatch, useSelector } from 'react-redux';
import { audioAction, uiAction } from '../../../store/actions';
import { Genres } from '../../../utils/const';
import styles from './index.module.scss';
import defaultCover from '../../../assets/img/default_music_cover.png';
import { uiSelector } from '../../../store/selectors';

interface IUploaderProps { 
  selectedFile: File;
  onCancel?: () => void;
  onSuccess?: () => void;
  metadata?: IAudioMetadata;
}

export interface IUploadFormData {
  name: string;
  artist: string;
  album: string;
  genre: string;
  description: string;
  privacy: string;
}

export interface IAudioMetadata {
  name: string;
  artist: string;
  album: string;
  genre: string;
  duration: number;
  description: string;
  cover: IPicture | null;
}

const Uploader: FC<IUploaderProps> = ({
  selectedFile,
  onCancel = () => {},
  onSuccess = () => {},
  metadata = {
    name: '',
    artist: '',
    genre: '',
    description: '',
    cover: null,
  }
}) => {

  const fileInputRef = useRef(null);

  const [ customCover, setCustomCover ] = useState<File | null>(null);

  const dispatch = useDispatch();
  const success = useSelector(uiSelector.success);
  
  useEffect(() => {
    if (success !== true) { return; }
    dispatch(uiAction.setLoadingResult({
      type: 'success',
      loading: null
    }));
    onSuccess();
  }, [ success, onSuccess, dispatch ]);

  const { control, handleSubmit, formState: { errors } } = useForm<IUploadFormData>({
    defaultValues: {
      name: metadata.name,
      artist: metadata.artist,
      genre: metadata.genre,
      description: metadata.description,
      privacy: 'private',
    }
  });

  const onSubmit = (data: IUploadFormData) => {
    const iPicture = metadata.cover;
    const cover = customCover ?? (iPicture !== null ? 
      new File([iPicture.data.buffer], iPicture.name || 'cover', { type: iPicture.format }) 
      : null);
    const input: API.UploadAudioRequest = {
      name: data.name,
      artists: data.artist,
      length: metadata.duration || 0,
      description: data.description,
      genre: data.genre,
      privacy: data.privacy,
      coverFile: cover,
      audioFile: selectedFile
    };
    dispatch(audioAction.postUploadAudio(input));
  };

  const onCancelClicked = () => {
    onCancel();
  };

  const onFileChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files || [];
    if (files.length > 0) {
      setCustomCover(files[0]);
    }
  }

  const onSelectCoverClicked = () => {
    const fileIns = fileInputRef.current;
    if (fileIns) {
      (fileIns as any).click();
    }
  };

  const getCover = () => {
    if (customCover) {
      return URL.createObjectURL(customCover);
    }
    const scannedCover = metadata.cover;
    if (scannedCover) {
      return URL.createObjectURL(
        new Blob([ scannedCover.data ], { type: scannedCover.format })
      );
    }
    return defaultCover;
  };

  return (
    <div className={styles.container}>
      <form id="upload-audio" className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.preview}>
          <img
            className={styles.image}
            alt={"upload"}
            src={getCover()}
          />
          <input
            ref={fileInputRef}
            hidden
            onChange={onFileChanged}
            type="file"
            accept="image/*"
          />
          <Button
            className={styles.uploadButton}
            title="Upload image"
            icon={<Icon.Upload />}
            onClick={onSelectCoverClicked}
          />
        </div>
        <div>
          <Controller 
            name="name"
            control={control}
            rules={{
              required: true
            }}
            render={({ field: { value, onChange, onBlur } }) => <TextField
              id="name"
              className={styles.input} 
              label="Name"
              placeholder="Enter the name of the audio"
              required
              value={value}
              onBlur={onBlur}
              onValueChange={onChange}
              validate={[
                { 
                  when: errors.name?.type === 'required',
                  message: `Please enter audio's name`
                }
              ]}
            />}
          />
          <Controller 
            name="artist"
            control={control}
            rules={{
              required: true
            }}
            render={({ field: { value, onChange, onBlur } }) => <TextField
              id="artist"
              className={styles.input} 
              label="Artist"
              placeholder="Enter the artist of the audio"
              required
              value={value}
              onBlur={onBlur}
              onValueChange={onChange}
              validate={[
                { 
                  when: errors.artist?.type === 'required',
                  message: `Please enter audio's artist`
                }
              ]}
            />}
          />
          <Controller 
            name="album"
            control={control}
            rules={{
              required: true
            }}
            render={({ field: { value, onChange, onBlur } }) => <TextField
              id="album"
              className={styles.input} 
              label="Album"
              placeholder="Enter the Album of the audio"
              value={value}
              onBlur={onBlur}
              onValueChange={onChange}
            />}
          />
          <Controller 
            name="genre"
            control={control}
            rules={{
              required: true
            }}
            render={({ field: { value, onChange } }) => <Select 
              id="genre" 
              label="Genre" 
              placeholder="Enter the genre of the audio"
              required
              value={value}
              selected={value}
              onSelectedOptionChange={onChange}
              options={Genres.map((el) => ({ label: el, value: el }))}
            />}
            
          />
          <Controller 
            name="description"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => <TextArea
              id="description"
              className={styles.input} 
              label="Description"
              placeholder="Enter the description of the audio"
              value={value}
              onBlur={onBlur}
              onValueChange={onChange}
              lineCount={3}
            />}
          />
          <div className={styles.privacy}>
            <p>Privacy: </p>
            <Controller
              name="privacy"
              control={control}
              rules={{
                required: true
              }}
              render={({field: { value, onChange }}) => (
                <RadioGroup
                  name="privacy-confirm"
                  direction="column"
                  options={[
                    { label: 'Private', value: 'private' },
                    { label: 'Following', value: 'following' },
                    { label: 'Follower', value: 'follower' },
                    { label: 'Public', value: 'public' },
                  ]}
                  selectedValue={value}
                  onValueChange={onChange}
                />
              )}
            />
          </div>
          <div className={styles.actions}>
            <Button 
              className={styles.cancelButton} 
              title="cancel" 
              variant="text"
              onClick={onCancelClicked} 
            />
            <Button 
              title="save" 
              type="submit" 
              form="upload-audio"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Uploader;