import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";

const App = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const ACCESS_KEY = "uGQS65bV6EsW8e6gyzJWK7vqsDZyXR0M7NNtqV2Mzuk";

  const resetState = useCallback(() => {
    setPage(1);
    setImages([]);
    setError(null);
  }, []);

  const handleSearchSubmit = (searchQuery) => {
    if (!searchQuery.trim()) {
      setError("Please enter a valid search query.");
      return;
    }
    setQuery(searchQuery);
    resetState();
  };

  const fetchImages = useCallback(async () => {
    if (!query) return;

    setIsLoading(true);
    try {
      const response = await axios.get("https://api.unsplash.com/search/photos", {
        params: { query, page, per_page: 12 },
        headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
      });
      const fetchedImages = response.data.results;

      if (fetchedImages.length === 0 && page === 1) {
        setError("No images found. Try a different query.");
      } else {
        setImages((prev) => (page === 1 ? fetchedImages : [...prev, ...fetchedImages]));
      }
    } catch (err) {
      setError(err?.response?.data?.message || "Error loading images");
    } finally {
      setIsLoading(false);
    }
  }, [query, page, ACCESS_KEY]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const openModal = (imageUrl) => {
    if (!isModalOpen) {  // Ensure modal is not already open
      setSelectedImage(imageUrl);
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      {error && <ErrorMessage message={error} />}
      {images.length > 0 && <ImageGallery images={images} onClick={openModal} />}
      {isLoading && <Loader />}
      {images.length > 0 && !isLoading && !error && (
        <LoadMoreBtn onClick={() => setPage((prev) => prev + 1)} isLoading={isLoading} />
      )}
      {isModalOpen && selectedImage && (
        <ImageModal isOpen={isModalOpen} onClose={closeModal} image={selectedImage} />
      )}
    </div>
  );
};

export default App;




