import PropTypes from "prop-types"
import styles from "./ErrorMessage.module.css"

const ErrorMessage = ({ message }) => {
    return (
        <div className={styles.ErrorMessage}>
            <p>{message}</p>
        </div>
    );
};

ErrorMessage.propType = {
    message: PropTypes.string.isRequired,
};

export default ErrorMessage;