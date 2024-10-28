

type MainProps = {
  weather: number;
};

export default function Main({ weather }: MainProps) {
  const getBackgroundImage = () => {
    switch (weather) {
      case 0:
        return "url('/thunderstorm.jpeg')";
      case 1:
        return "url('/rain.jpg')";
      case 2:
        return "url('/rain.jpg')";
      case 3:
        return "url('/snow.jpeg')";
      case 4:
        return "url('/tornado.jpg')";
      case 5:
        return "url('/clear-day.jpg')";
      case 6:
        return "url('/clear-night.jpg')";
      case 7:
        return "url('/cloudy-day.jpg')";
      case 8:
        return "url('/cloudy-night.jpg')";
      default:
        return "url('/dusk.jpg')";
    }
  };

  return (
    <div
      className="main-background"
      style={{
        backgroundImage: getBackgroundImage(),
      }}
    >
    </div>
  );
}
