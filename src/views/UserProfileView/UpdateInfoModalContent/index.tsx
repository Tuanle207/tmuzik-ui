import { FC, useRef, useState, ChangeEvent } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Icon } from '../../../assets';
import { Button, CardCover, TextField } from '../../../components';
import styles from './index.module.scss';

interface IUpdateInfoModalContentProps {
  cover?: string;
  fullName?: string;
}

export const UpdateInfoModalContent: FC<IUpdateInfoModalContentProps> = ({
  cover,
  fullName
}) => {

  const coverFileRef = useRef<HTMLInputElement>(null);

  const [ coverFile, setCoverFile ] = useState<File>();

  const { control, handleSubmit, formState: { errors } } = useForm<{ fullname: string }>({
    defaultValues: { fullname: fullName }
  });

  const openImgFileDialog = () => {
    coverFileRef.current?.click();
  };

  const onCoverFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files || [];
    if (files.length > 0) {
      const file = files[0];
      setCoverFile(file);
    }
  };

  const onSubmit = (data: { fullname: string} ) => {
    console.log(data);
  };

  const coverUrl = coverFile ? URL.createObjectURL(coverFile) : cover;

  return (
    <div className={styles.container}>
      <div className={styles.coverWrapper}>
        <CardCover
          editable
          roundBorder
          coverUrl={coverUrl}
          onClick={openImgFileDialog}
          defaultIcon={Icon.Avatar}
        />
        <input hidden ref={coverFileRef} type="file" accept="image/*" onChange={onCoverFileChange} />
      </div>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="fullname"
          control={control}
          rules={{ required: true }}
          render={({ field: { value, onChange, onBlur } }) => (
            <TextField
              id="name"
              placeholder="Nhập tên hiển thị"
              label="Tên"
              value={value}
              onValueChange={onChange}
              onBlur={onBlur}
              validate={[
                {
                  when: errors.fullname?.type === 'required',
                  message: 'Display name cannot be empty'
                }
              ]}
            />
          )}
        />
        <Button
          className={styles.submitButton}
          title="Lưu"
          variant="round"
          type="submit"
          size="small"
        />
      </form>
    </div>
  );
};