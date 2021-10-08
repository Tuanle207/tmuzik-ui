import { FC, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Header, TextField, ViewWrapper } from '../../components';
import { searchAction } from '../../store/actions';
import { SearchCategory } from '../../utils/const';
import { UserResults } from './Sections';
import styles from './index.module.scss';

interface ISearchViewProps { }

export const SearchView: FC<ISearchViewProps> = () => {

  const { control, handleSubmit, getValues } = useForm<API.GetSearchResultsRequest>({
    defaultValues: {
      query: '',
      category: [ SearchCategory.User ].join(','),
      pageIndex: 1,
      pageSize: 10
    }
  });

  const dispatch = useDispatch();

  useEffect(() => {
    const data = getValues();
    dispatch(searchAction.getSearchResults(data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSearchSubmit = (data: API.GetSearchResultsRequest) => {
    dispatch(searchAction.getSearchResults(data));
  };

  return (
    <ViewWrapper
      title="Tìm kiếm"
      className={styles.container}
      header={({ opacity }) => (
        <Header opacity={opacity} >
          <form
            className={styles.customHeaderContent}
            onSubmit={handleSubmit(onSearchSubmit)}
            onChange={handleSubmit(onSearchSubmit)}
          >
            <Controller
              name="query"
              control={control}
              render={({ field: { value, onChange, onBlur  } }) => (
                <TextField
                  className={styles.searchBar}
                  id="search-bar"
                  placeholder="Người bạn, nghệ sĩ, bài hát, album hoặc playlist"
                  variant="search-bar"
                  mode="light"
                  value={value}
                  onValueChange={onChange}
                  onBlur={onBlur}
                />
              )}
            />
          </form>
        </Header>
      )}
    >
      <UserResults />
    </ViewWrapper>
  );
};