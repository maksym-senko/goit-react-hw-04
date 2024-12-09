import {useState} from "react";
import toast, {Toaster} from "react-hot-toast";
import styles from "./SearchBar.module.css"

const SearchBar = ({ onSubmit }) => {
const [query, setQuery] = useState("");

const handleInputChange = (e) => {
    setQuery(e.target.value);
};
    
const handleFormSubmit = (e) => {
    e.preventDefault();
    
    if (query.trim() === "") {
        toast.error("Please enter a search query!");
        return;
    }
    
    onSubmit(query.trim());
    setQuery("");
};
    
return (
    <header className={styles.header}>
        <form onSubmit={handleFormSubmit}>
            <input
              className={styles.input}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              value={query}
              onChange={handleInputChange}
            />
            <button className={styles.btnSearch} type="submit">Search</button>
          </form>
          <Toaster position="top-right" />
    </header>
    );
};
    
export default SearchBar;