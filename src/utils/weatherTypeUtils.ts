export const getWeatherType = (weatherId: number, icon: string): number => {
    const lastChar = icon.charAt(icon.length - 1);
  
    if (weatherId > 199 && weatherId < 299) {
      return 0; // thunderstorm
    } else if (weatherId > 299 && weatherId < 322) {
      return 1; // drizzle
    } else if (weatherId > 499 && weatherId < 532) {
      return 2; // rain  
    } else if (weatherId > 599 && weatherId < 623) {
      return 3; // snow
    } else if (weatherId > 699 && weatherId < 782) {
      return 4; // atmosphere
    } else if (weatherId === 800) {
      return lastChar === 'd' ? 5 : 6; // clear day or night
    } else {
      return lastChar === 'd' ? 7 : 8; // cloudy day or night
    }
  };
  