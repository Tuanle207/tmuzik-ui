import { FC } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Header, TextField, ViewWrapper } from '../../components';
import { dashboardAction } from '../../store/actions/dashboardAction';
import { SearchCategory } from '../../utils/const';
import styles from './index.module.scss';
import { UserResults } from './Sections';

interface ISearchViewProps { }

export const SearchView: FC<ISearchViewProps> = () => {

  const { control, handleSubmit } = useForm<API.GetSearchResultsRequest>({
    defaultValues: {
      query: '',
      category: [ SearchCategory.User ].join(','),
      pageIndex: 1,
      pageSize: 10
    }
  });

  const dispatch = useDispatch();

  const onSearchSubmit = (data: API.GetSearchResultsRequest) => {
    dispatch(dashboardAction.getSearchResults(data));
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