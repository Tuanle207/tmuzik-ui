import { FC, useEffect, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Prompt, useHistory } from 'react-router';
import { artistApiService } from '../../api/services';
import { Icon } from '../../assets';
import { Button, IntroCard, Modal, TextArea, TextField, Typography, ViewWrapper } from '../../components';
import { RemovableFileItem } from './RemovableFileItem';
import { authSelector, uiSelector } from '../../store/selectors';
import styles from './index.module.scss';
import { routes } from '../../routings';
import { toast } from 'react-toastify';

interface IClaimArtistViewProps {

}

const MAX_PHOTOS = 10;
const MAX_DOCS = 5;

export const ClaimArtistView: FC<IClaimArtistViewProps> = () => {

  const history = useHistory();

  const imgFileInputRef = useRef<HTMLInputElement>(null);
  const docFileInputRef = useRef<HTMLInputElement>(null);
  const avatarFileInputRef = useRef<HTMLInputElement>(null);
  const coverFileInputRef = useRef<HTMLInputElement>(null);
  
  const [ photosMap, setPhotosMap ] = useState<Map<string, File>>(new Map<string, File>());
  const [ docsMap, setDocsMap ] = useState<Map<string, File>>(new Map<string, File>());
  const [ avatar, setAvartar ] = useState<File>();
  const [ cover, setCover ] = useState<File>();
  const [ openProfileCoversModal, setOpenProfileCoversModal ] = useState(false);
  
  const dominentColor = useSelector(uiSelector.dominantColor);
  const userProfile = useSelector(authSelector.userProfile);

  const { control, handleSubmit, watch, formState: { errors } } = useForm<API.ClaimArtistRequest>({
    defaultValues: {
      name: '',
      description: '',
      facebookUrl: '',
      instagramUrl: '',
      twitterUrl: '',
      youtubeUrl: '',
    },
  });

  useEffect(() => {
    if (userProfile?.isArtist === true) {
      toast.error('Bạn không có quyền truy cập vào trang này!')
      history.replace(routes.Home);
    }
  }, [ userProfile, history ]);

  const onSubmitClicked = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    handleSubmit(onSubmit)(e);
  };

  const onSubmit = async (data: API.ClaimArtistRequest) => {
    const input: API.ClaimArtistRequest = {
      ...data,
      photos: Array.from(photosMap.values()),
      avatar: avatar,
      cover: cover,
      certificates: Array.from(docsMap.values())
    };

    console.log({input});

    await artistApiService.claimArtistAsync(input);
  };

  const onAvatarImgSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files || [];
    if (files.length > 0) {
      const file = files[0];
      setAvartar(file);
    }
  };

  const onCoverImgSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files || [];
    if (files.length > 0) {
      const file = files[0];
      setCover(file);
    }
  };

  const onImgFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files || [];
    if (files.length > 0) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      const newMap = new Map(photosMap);
      newMap.set(url, file);
      setPhotosMap(newMap);
    }
  };

  const onDocFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files || [];
    if (files.length > 0) {
      const file = files[0];
      const name = file.name;
      let key = name
      let count = 0;
      while (docsMap.has(key)) {
        count++;
        key = `${name}(${count})`;
      }
      const newMap = new Map(docsMap);
      newMap.set(key, file);
      setDocsMap(newMap);
    }
  };

  const onImgFileRemove = (url: string) => {
    const newMap = new Map(photosMap);
    newMap.delete(url);
    setPhotosMap(newMap);
    
    const ins = imgFileInputRef.current;
    if (ins) {
      ins.files = null;
    }
  };

  const onDocFileRemove = (name: string) => {
    const newMap = new Map(docsMap);
    newMap.delete(name);
    setDocsMap(newMap);
    
    const ins = imgFileInputRef.current;
    if (ins) {
      ins.files = null;
    }
  };

  const openAvatarFileDialog = () => {
    avatarFileInputRef.current?.click();
  };

  const openCoverFileDialog = () => {
    coverFileInputRef.current?.click();
  };

  const openImageFileDialog = () => {
    imgFileInputRef.current?.click();
  };

  const openDocFileDialog = () => {
    docFileInputRef.current?.click();
  };

  return (
    <ViewWrapper title="Trở thành nghệ sĩ">
      {
        userProfile?.isArtist === false && (
          <Prompt message="You have unsaved changes, are you sure you want to leave?" />
        )
      }
      <IntroCard
        title={watch("name") || "Your Artist Name"}
        roundCover
        coverUrl={avatar && URL.createObjectURL(avatar)}
        secondaryCoverUrl={cover && URL.createObjectURL(cover)}
        description={watch("description")}
        onEditClicked={() => setOpenProfileCoversModal(true)}
        defaultIcon={Icon.Avatar}
        prominentColor={dominentColor}
        category="Nghệ sĩ"
        editable
      />
      <Modal
        title={`Chọn ảnh đại diện & ảnh bìa`}
        isOpen={openProfileCoversModal} 
        onRequestClose={() => setOpenProfileCoversModal(false)}
        shouldCloseOnOverlayClick
      >
        <div className={styles.modal}>
          <Button title="Chọn ảnh đại diện" onClick={openAvatarFileDialog} />
          <Button title="Chọn ảnh bìa" onClick={openCoverFileDialog} />
          <input ref={avatarFileInputRef} hidden type="file" onChange={onAvatarImgSelect} accept="image/*" />
          <input ref={coverFileInputRef} hidden type="file" onChange={onCoverImgSelect} accept="image/*" />
        </div>
      </Modal>
      <Typography variant="h3" className={styles.title}>Điền thông tin cơ bản</Typography>
      <div className={styles.fields}>
        <div className={styles.col}>
          <Controller
            name="name"
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { value, onChange, onBlur } }) => <TextField
              id="name"
              className={styles.input}
              required
              value={value}
              onValueChange={onChange}
              onBlur={onBlur}
              label="Your Artist Name"
              placeholder="Enter your artist name"
              validate={[
                {
                  when: errors.name?.type === 'required',
                  message: 'Name is required!'
                }
              ]}
            />}
          />
          <Controller
            name="description"
            control={control}
            render={({ field: { value, onChange, onBlur } }) => <TextArea
              id="description"
              className={[styles.input, styles.description].join(' ')}
              value={value}
              onValueChange={onChange}
              onBlur={onBlur}
              label="Description"
              placeholder="Enter some infomation about you"
              lineCount={11}
            />}
          />
         
        </div>
        <div className={styles.col}>
          <Controller
            name="facebookUrl"
            control={control}
            rules={{validate: (value) => {
              return !value || value.startsWith('https://www.facebook.com')
            }}}
            render={({ field: { value, onChange, onBlur } }) => <TextField
              id="facebook"
              className={styles.input}
              label="Facebook profile"
              placeholder="eg: https://www.facebook.com/your-artist-username"
              value={value}
              onValueChange={onChange}
              onBlur={onBlur}
              validate={[
                {
                  when: errors.facebookUrl?.type === 'validate',
                  message: 'Invalid Facebook profile!'
                }
              ]}
            />}
          />
          <Controller
            name="instagramUrl"
            control={control}
            rules={{validate: (value) => {
              return !value || value.startsWith('https://www.instagram.com')
            }}}
            render={({ field: { value, onChange, onBlur } }) => <TextField
              id="instagram"
              className={styles.input}
              label="Instagram profile"
              placeholder="eg: https://www.instagram.com/your-artist-username"
              value={value}
              onValueChange={onChange}
              onBlur={onBlur}
              validate={[
                {
                  when: errors.instagramUrl?.type === 'validate',
                  message: 'Invalid Instagram profile!'
                }
              ]}
            />}
          />
          <Controller
            name="twitterUrl"
            control={control}
            rules={{validate: (value) => {
              return !value || value.startsWith('https://www.twitter.com')
            }}}
            render={({ field: { value, onChange, onBlur } }) => <TextField
              id="Twitter"
              className={styles.input}
              label="Twitter profile"
              placeholder="eg: https://www.twitter.com/your-artist-username"
              value={value}
              onValueChange={onChange}
              onBlur={onBlur}
              validate={[
                {
                  when: errors.twitterUrl?.type === 'validate',
                  message: 'Invalid Twitter profile!'
                }
              ]}
            />}
          />
           <Controller
            name="youtubeUrl"
            control={control}
            rules={{validate: (value) => {
              return !value || value.startsWith('https://www.youtube.com')
            }}}
            render={({ field: { value, onChange, onBlur } }) => <TextField
              id="youtube"
              className={styles.input}
              label="Youtube profile"
              placeholder="eg: https://www.youtube.com/your-artist-username"
              value={value}
              onValueChange={onChange}
              onBlur={onBlur}
              validate={[
                {
                  when: errors.youtubeUrl?.type === 'validate',
                  message: 'Invalid Youtube profile!'
                }
              ]}
            />}
          />
        </div>
      </div>
      <Typography variant="h3" className={styles.title}>Chọn ảnh giới thiệu</Typography>
      <div className={styles.imageSelect}>
        <input ref={imgFileInputRef} hidden type="file" onChange={onImgFileSelect} accept="image/*" />
        <div className={styles.photos}>
        {
          Array.from(photosMap.keys()).map((url, index) => (
            <RemovableFileItem 
              key={index} 
              src={url}
              className={styles.photoItem}
              alt={`selected ${index}`}
              removable
              onRemoveClick={onImgFileRemove} 
            />
          ))
        }
        {
          photosMap.size < MAX_PHOTOS && (
            <div className={styles.addBtnWrapper} onClick={openImageFileDialog}>
              <div>
                <Icon.Plus />
                <span>Thêm ảnh</span>
              </div>
            </div>
          ) 
        }
        </div>
      </div>
      <Typography variant="h3" className={styles.title}>Giấy tờ chứng thực nghệ sĩ</Typography>
      <div className={styles.docSelect}>
        <input ref={docFileInputRef} hidden type="file" onChange={onDocFileSelect} accept=".doc,.docx,.pdf" />
        <div className={styles.photos}>
        {
          Array.from(docsMap.keys()).map((key, index) => (
            <RemovableFileItem 
              key={index} 
              className={styles.photoItem}
              alt={key}
              removable
              element="div"
              onRemoveClick={onDocFileRemove}
            />
          ))
        }
        {
          docsMap.size < MAX_DOCS && (
            <div className={styles.addBtnWrapper} onClick={openDocFileDialog}>
              <div>
                <Icon.Plus />
                <span>Thêm tệp</span>
              </div>
            </div>
          )
        }
        </div>
      </div>
      <div className={styles.action}>
        <Button
          className={styles.submitBtn}
          title="Hoàn tất"
          onClick={onSubmitClicked}
        />
      </div>
    </ViewWrapper>
  );
};