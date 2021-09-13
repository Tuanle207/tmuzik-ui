import { FC } from 'react';
import DatePicker from 'react-datepicker';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { toast } from 'react-toastify';
import { authApiService } from '../../../api/services';
import { Button, TextField } from '../../../components';
import { taskStateAction } from '../../../store/actions';
import { taskStateSelectorCreator } from '../../../utils/selectorCreators';
import styles from './index.module.scss';

const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

interface ISignupFormProps { }

export const SignupForm: FC<ISignupFormProps> = () => {

  const history = useHistory();

  const { control, handleSubmit, formState: { errors }, getValues } = useForm<API.SignupRequest>({
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
      passwordConfirm: ''
    },
  });

  const dispatch = useDispatch();
  const signupState = useSelector(taskStateSelectorCreator(taskStateAction.signup.toString()));

  const onBackClicked = () => {
    history.goBack();
  };

  const handleSignup = () => {
    handleSubmit(onSubmit)();
  };

  const onSubmit = async (data: API.SignupRequest) => {
    try {
      dispatch(taskStateAction.signup({ state: 'processing' }));

      await authApiService.signupAsync(data);
      localStorage.setItem('email', data.email);

      dispatch(taskStateAction.signup({ state: 'success' }));
    } catch (err: any) {
      const errMessage = err?.response?.detail || 'Unknown error has occurred. Failed to register!'; 
      dispatch(taskStateAction.signup({ state: 'error', error: errMessage }));
      toast.error(errMessage);
    }
  };

  return (
    <form className={styles.container} autoComplete="off" role="presentation" onSubmit={handleSubmit(onSubmit)} >
      <div className={styles.intro}>
        <h2>Sign up new TMuzik account!</h2>
        <p>We make it convenient and enjoyable for music listeners to stream and manage their audio contents.</p>
      </div>
      <div className={styles.fields}>
        <div>
          <Controller
            name="email"
            control={control}
            rules={{
              required: true,
              pattern: EMAIL_PATTERN
            }}
            render={({ field: { value, onChange, onBlur } }) => <TextField
              id="email-signup"
              required
              value={value}
              onValueChange={onChange}
              onBlur={onBlur}
              autoComplete="new-password"
              label="Email"
              placeholder="eg: you@company.com"
              validate={[
                {
                  when: errors.email?.type === 'required',
                  message: 'Email is required!'
                },
                {
                  when: errors.email?.type === 'pattern',
                  message: 'Invalid email address!'
                }
              ]}
            />}
          />
        </div>
        <div>
          <Controller
            name="fullName"
            control={control}
            rules={{
              required: true
            }}
            render={({ field: { value, onChange, onBlur } }) => <TextField
              id="fullName"
              required
              value={value}
              onValueChange={onChange}
              onBlur={onBlur}
              autoComplete="off"
              label="Full name"
              placeholder="enter your name"
              validate={[
                {
                  when: errors.fullName?.type === 'required',
                  message: 'Name is required!'
                }
              ]}
            />}
          />
        </div>
        <div>
          <Controller
            name="dob"
            control={control}
            rules={{
              required: true
            }}
            render={({ field: { value, onChange, onBlur } }) => 
              <DatePicker
                required
                selected={value}
                dateFormat="dd/MM/yyyy"
                onChange={onChange}
                popperPlacement="bottom"
                todayButton="Today"
                onBlur={onBlur}
                placeholderText="in dd/MM/yyyy"
                customInput={
                  <TextField
                    id="dob-picker" 
                    label="Your Birthday"
                    validate={[
                      {
                        when: errors.dob?.type === 'required',
                        message: 'Birthday is required!'
                      }
                    ]}
                  />
                }
              />
            }
          />
        </div>
        <div>
          <Controller
            name="password"
            control={control}
            rules={{
              required: true,
              minLength: 5,
            }}
            render={({ field: { value, onChange, onBlur } }) => <TextField
              id="password-signup"
              required
              type="password"
              value={value}
              onValueChange={onChange}
              onBlur={onBlur}
              autoComplete="new-password"
              label="Password"
              placeholder="5+ characters"
              validate={[
                {
                  when: errors.password?.type === 'required',
                  message: 'Password is required!'
                },
                {
                  when: errors.password?.type === 'minLength',
                  message: 'Password must have at least 5 characters!'
                }
              ]}
            />}
          />
        </div>
        <div>
          <Controller
            name="passwordConfirm"
            control={control}
            rules={{
              required: true,
              validate: (value: string) => {
                const password = getValues('password');
                return value === password;
              }
            }}
            render={({ field: { value, onChange, onBlur } }) => <TextField
              id="password-confirm-signup"
              required
              type="password"
              value={value}
              onValueChange={onChange}
              onBlur={onBlur}
              autoComplete="new-password"
              label="Confirm Password"
              placeholder="Re-enter your password"
              validate={[
                {
                  when: errors.passwordConfirm?.type === 'required',
                  message: 'Please confirm your password!'
                },
                {
                  when: errors.passwordConfirm?.type === 'validate',
                  message: 'Passwords did not match!'
                }
              ]}
            />}
          />
        </div>
      </div>
      <div className={styles.actions}>
        <Button 
          title="Back" 
          variant="text"
          onClick={onBackClicked}
        />
        <Button
          loading={signupState.state === 'processing'}
          title="Submit"
          onClick={handleSignup}
        />
      </div>
    </form>
  );
};