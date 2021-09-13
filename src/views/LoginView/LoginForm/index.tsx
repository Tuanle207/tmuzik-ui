import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { push } from 'connected-react-router';
import { Icon } from '../../../assets';
import { paths } from '../../../routings';
import { authAction } from '../../../store/actions';
import { Button, TextField } from '../../../components';
import styles from './index.module.scss';

interface ILoginFormProps { }

export const LoginForm: FC<ILoginFormProps> = () => {

  const dispatch = useDispatch();
  
  const { control, handleSubmit, formState: { errors } } = useForm<API.LoginRequest>({
    defaultValues: {
      email: localStorage.getItem('email') || '',
      password: '',
    }
  });


  const onSignupClicked = () => {
    dispatch(push(paths.Signup));
  };
  
  const onSigninClicked = () => {
    handleSubmit(onSubmit)();
  };
  
  const onSubmit = (data: API.LoginRequest) => {
    localStorage.setItem('email', data.email);
    dispatch(authAction.postLogin(data));
  };

  const onFbSigninClicked = () => {
    dispatch(authAction.postFbLogin());
  };

 
  return (
    <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.intro}>
        <h2>Sign in to TMuzik</h2>
        <p>We make it convenient and enjoyable for music listeners to stream and manage their audio contents.</p>
      </div>
      <div className={styles.fields}>
        <div>
          <Controller
            name="email"
            control={control}
            rules={{
              required: true
            }}
            render={({ field: { value, onChange, onBlur } }) => <TextField
              id="email-asdasjkdn" 
              value={value}
              onValueChange={onChange}
              onBlur={onBlur}
              autoComplete="off"
              label="Email Address"
              placeholder="you@company.com"
              validate={[
                {
                  when: errors.email?.type === 'required',
                  message: 'Email is required!'
                }
              ]}
            />}
          />
        </div>
        <div>
          <Controller
            name="password"
            control={control}
            rules={{
              required: true
            }}
            render={({ field: { value, onChange, onBlur } }) => <TextField
              id="password"
              type="password"
              value={value}
              onValueChange={onChange}
              onBlur={onBlur}
              autoComplete="off"
              label="Password"
              placeholder="5+ characters"
              validate={[
                {
                  when: errors.password?.type === 'required',
                  message: 'Password is required!'
                }
              ]}
            />}
          />
        </div>
      </div>
      <div className={styles.actions}>
        <Button 
          title="Sign in"
          onClick={onSigninClicked}
        />
        <Button 
          title="Create account" 
          variant="text"
          onClick={onSignupClicked} 
        />
      </div>
      <div className={styles.alternatives}>
        <span>OR</span>
        <Button className={[styles.socialButton, styles.fbButton].join(' ')} 
          title="Sign in with Facebook" 
          icon={<Icon.Facebook />}
          onClick={onFbSigninClicked}
        />
        <Button className={[styles.socialButton, styles.ggButton].join(' ')} 
          title="Sign in with Google" 
          icon={<Icon.Google />}
        />
      </div>
    </form>
  );
};