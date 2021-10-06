import { FC, useState, } from 'react';
import { Typography, Modal } from '../../../components';
import { DetailModalContent } from './DetailModalContent';
import styles from './index.module.scss';

interface IArtistIntroProps {
  description?: string;
}

export const ArtistIntro: FC<IArtistIntroProps> = ({
  description = "Thành viên: Vũ Đinh Trọng Thắng Nguyễn Chí Hùng Phan Việt Hoàng Nguyễn Hùng Nam Anh \nTiểu sử: Ngọt là ban nhạc với các thành viên Vũ Đinh Trọng Thắng (hát, rhythm guitar), Nguyễn Chí Hùng (lead guitar), Phan Việt Hoàng (bass guitar) và Nguyễn Hùng Nam Anh (trống). Ngọt cho ra mắt album đầu tay cùng tên gồm 10 ca khúc vào tháng 5 năm 2016. Ngọt nhanh chóng tạo được tiếng vang trong cộng đồng âm nhạc underground trên toàn quốc và qua nhiều bản thu âm trên mạng xã hội. Ban nhạc dần trở thành một trong những nghệ sĩ nổi bật trong dòng nhạc indie tại Việt Nam. Album thứ hai của ban nhạc mang tên Ng`bthg được ra mắt vào tháng 9 năm 2017. Đĩa đơn \"Em dạo này\" trích từ album nhận được sự đánh giá tích cực từ người hâm mộ và giới chuyên môn, giúp ban nhạc giành được Giải thưởng Âm nhạc Cống hiến cho \"Bài hát của năm\" cũng như \"Nghệ sĩ mới của năm\" tại lễ trao giải lần thứ 13 năm 2018. Năm 2019, Ngọt ra mắt album mới với tựa 3 (tuyển tập nhạc Ngọt mới trẻ sôi động 2019)."
}) => {

  const [ showDetailModal, setShowDetailModal ] = useState(false);

  const onIntroCardClicked = () => {
    setShowDetailModal(true);
  };

  return (
    <div className={styles.section}>
      <div className={styles.about}>
        <Typography variant="h3" className={styles.title}>
          Description
        </Typography>
      </div>
      <div className={styles.infoCard} onClick={onIntroCardClicked}>
        <div className={styles.content}>
          <div className={styles.stats}>
            <p>
              128.472 người nghe hàng tháng
            </p>
          </div>
          <div className={styles.description}>
            <p>
            { description.substr(0, 330) + "..." }
            </p>
          </div>
        </div>
      </div>
      <Modal
        isOpen={showDetailModal}
        onRequestClose={() => setShowDetailModal(false)}
        shouldCloseOnOverlayClick
        className={styles.detailModal}
        closeTimeoutMS={200}
      >
        <DetailModalContent />
      </Modal>
    </div>
  );
};