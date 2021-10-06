import { FC } from 'react';
import { Icon } from '../../../assets';
import { Link, PhotoSlider } from '../../../components';
import styles from './DetailModalContent.module.scss';

interface IDetailModalContentProps {
  photoItems?: string[];
  description?: string;
}

export const DetailModalContent: FC<IDetailModalContentProps> = ({
  photoItems = [
    "https://kenh14cdn.com/thumb_w/660/2019/12/22/artboard-1-copy-6-15770337384481151658079.png",
    "https://i.ytimg.com/vi/mjpUWO5MuPg/maxresdefault.jpg",
    "https://photo-cms-vovworld.zadn.vn/w500/Uploaded/vovworld/ovunhuo/2020_07_25/ngot_DWGJ_637312947742131175.jpg",
    "https://vnn-imgs-f.vgcloud.vn/2018/11/01/19/ngot-band-nguoi-nghe-si-trong-sang-co-cai-dau-loc-trong-bong-toi-1.jpg"
  ],
  description = "Thành viên: Vũ Đinh Trọng Thắng Nguyễn Chí Hùng Phan Việt Hoàng Nguyễn Hùng Nam Anh \nTiểu sử: Ngọt là ban nhạc với các thành viên Vũ Đinh Trọng Thắng (hát, rhythm guitar), Nguyễn Chí Hùng (lead guitar), Phan Việt Hoàng (bass guitar) và Nguyễn Hùng Nam Anh (trống). Ngọt cho ra mắt album đầu tay cùng tên gồm 10 ca khúc vào tháng 5 năm 2016. Ngọt nhanh chóng tạo được tiếng vang trong cộng đồng âm nhạc underground trên toàn quốc và qua nhiều bản thu âm trên mạng xã hội. Ban nhạc dần trở thành một trong những nghệ sĩ nổi bật trong dòng nhạc indie tại Việt Nam. Album thứ hai của ban nhạc mang tên Ng`bthg được ra mắt vào tháng 9 năm 2017. Đĩa đơn \"Em dạo này\" trích từ album nhận được sự đánh giá tích cực từ người hâm mộ và giới chuyên môn, giúp ban nhạc giành được Giải thưởng Âm nhạc Cống hiến cho \"Bài hát của năm\" cũng như \"Nghệ sĩ mới của năm\" tại lễ trao giải lần thứ 13 năm 2018. Năm 2019, Ngọt ra mắt album mới với tựa 3 (tuyển tập nhạc Ngọt mới trẻ sôi động 2019)."
}) => {

  return (
    <div className={styles.container}>
      <div className={styles.photoSlider}>
        <PhotoSlider items={photoItems} />
      </div>
      <div className={styles.detail}>
        <div className={styles.stats}>
          <div className={styles.statsItem}>
            <p className={styles.value}>310.060</p>
            <p className={styles.label}>Người theo dõi</p>
          </div>
          <div className={styles.statsItem}>
            <p className={styles.value}>129.484</p>
            <p className={styles.label}>Người nghe hàng tháng</p>
          </div>
          <div className={[styles.statsItem, styles.horizontal].join(' ')}>
            <Link to="https://www.facebook.com/tuanle207" target="_blank">
              <Icon.Facebook className={styles.icon} />
              <span>Facebook</span>
            </Link>
          </div>
        </div>
        <div className={styles.description}>
          <p>{ description }</p>
        </div>
      </div>
    </div>
  );
};