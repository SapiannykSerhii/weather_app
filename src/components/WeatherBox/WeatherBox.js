import PickCity from '../PickCity/PickCity';
import WeatherSummary from '../WeatherSummary/WeatherSummary';
import Loader from '../Loader/Loader';
import { useState, useCallback} from 'react';
import ErrorBox from '../ErrorBox/ErrorBox';
// import ErrorBox from '../ErrorBox/ErrorBox/';

const WeatherBox = (props) => {

  const [weather, setWeather] = useState (null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const handleCityChange = useCallback((city) => {
    setError(false);
    setIsLoading(true);
    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5b6c26683bb4436a7e2baae923a60920&units=metric`)
    .then((res) => {
      if (res.status === 200) {
        return res.json().then((data) => {
          console.log(data);
          setWeather({
            city: data.name,
            temp: data.main.temp,
            icon: data.weather[0].icon,
            description: data.weather[0].main,
          });
          setIsLoading(false);
        });
       } else {
         setError(true);
         }
    });
   }, []);
  return (
    <section>
      <PickCity action={handleCityChange}/>
      {weather && !error && <WeatherSummary {...weather} />}
     {isLoading && !error && <Loader />}
     {error && <ErrorBox/>}
    </section>
  )
}

export default WeatherBox;