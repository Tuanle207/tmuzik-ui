import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Icon } from '../../assets';
import { Button, DotSeperator, IntroCard, LinearEffectBackground, Link, ViewWrapper } from '../../components';
import { IconButton } from '../../components/IconButton';
import { IArtistViewParams } from '../../routings';
import { authSelector, uiSelector } from '../../store/selectors';
import styles from './index.module.scss';
import { Albums, ArtistIntro, PopularAlbums, PopularAudios } from './Sections';

interface IArtistViewProps { }

export const ArtistView: FC<IArtistViewProps> = () => {

  const { artistId } = useParams<IArtistViewParams>();

  const artistInfo = useSelector(authSelector.artistInfo);
  const dominentColor = useSelector(uiSelector.dominantColor);

  useEffect(() => {
    // if (artistInfo?.id === artistId) {

    // }

  }, []);

  return (
    <ViewWrapper title="Thông tin nghệ sĩ">
      <IntroCard
        category="Nghệ sĩ"
        title="Ngọt"
        roundCover
      >
        <p>
        128.472 người nghe hàng tháng
        </p>
        <DotSeperator />
        <Link>
          101.462 người theo dõi
        </Link>
        <DotSeperator />
        <Link>
          9 đang theo dõi
        </Link>
      </IntroCard>
      <div className={styles.content}>
        <LinearEffectBackground color={dominentColor} />
        <div className={styles.actions}>
          <IconButton className={styles.playButton}>
            <Icon.PlayV2 />
          </IconButton>
          <Button className={styles.followButton} variant="outlined" title="Follow"/>
          <IconButton className={styles.optionButton}>
            <Icon.ThreeDot />
          </IconButton>
        </div>
        <PopularAudios />
        <PopularAlbums />
        <Albums />
        <ArtistIntro />
      </div>
    </ViewWrapper>
  );
};