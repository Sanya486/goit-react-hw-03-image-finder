import axios from 'axios';

const APIKEY = '36686955-32d5f33599a736e8573496700';

const fetchImages = async (query, page) => {
  const URL = `https://pixabay.com/api/?q=${query}&page=${page}&key=${APIKEY}&image_type=photo&orientation=horizontal&per_page=12`;
  const response = await axios.get(URL);
  return response.data;
};

export { fetchImages };
