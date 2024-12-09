import PropTypes from "prop-types";
import ImageCard from "../ImageCard/ImageCard";
import styles from "./ImageGallery.module.css"

const ImageGallery = ({ images, onClick }) => {
  return (
    <ul className={styles.imageContainer}>
      {images.map((image) => (
        <li key={image.id}>
        <div>
          <ImageCard className={styles.listItems} image={image} onClick={() => onClick(image)} />
        </div>
      </li>
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      })
    ).isRequired,
    onClick: PropTypes.func.isRequired,
  };

export default ImageGallery;
