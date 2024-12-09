import PropTypes from "prop-types";
import styles from "./ImageCard.module.css"

function ImageCard({ image, onClick }) {
  return (
    <div  onClick={() => onClick(image)}>
      <img className={styles.items} src={image.urls.small} alt={image.alt_description} />
    </div>
  );
}

ImageCard.propTypes = {
  image: PropTypes.shape({
    urls: PropTypes.shape({
      small: PropTypes.string.isRequired,
    }).isRequired,
    alt_description: PropTypes.string,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ImageCard;
