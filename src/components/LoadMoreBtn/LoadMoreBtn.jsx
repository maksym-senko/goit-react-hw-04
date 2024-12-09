import PropTypes from "prop-types";
import styles from "./LoadMoreBtn.module.css"

const LoadMoreBtn = ({ onClick, isLoading }) => {
  return (
    <div className={styles.btnLoadMoreContainer}>
      <button className={styles.btnLoadMore} onClick={onClick} disabled={isLoading}>
      {isLoading ? (
        <span ></span>
      ) : (
        "Load more"
      )}
    </button>
    </div>
  );
};

LoadMoreBtn.propTypes = {
    onClick: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
  };

export default LoadMoreBtn;
