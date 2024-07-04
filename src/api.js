import axios from 'axios';

const apiKey = '2HJUDHRNZ35Z72WP6GDHC4XME';
const apiUrl = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline';

const fetchWeatherData = async (location) => {
  const url = `${apiUrl}/${location}?unitGroup=metric&include=current&key=${apiKey}&contentType=json`;
  
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return null;
  }
};
export default fetchWeatherData;
