let icons = new Skycons({"color": "#397FF3"});

const canvas = document.querySelector("canvas")

switch(canvas.id) {

    case "clear-day":
        icons.set("clear-day", Skycons.CLEAR_DAY);
        break;
    case "clear-night":
        icons.set("clear-night", Skycons.CLEAR_NIGHT);
        break;
    case "partly-cloudy-day":
        icons.set("partly-cloudy-day", Skycons.PARTLY_CLOUDY_DAY);
        break;
    case "partly-cloudy-night":
        icons.set("partly-cloudy-night", Skycons.PARTLY_CLOUDY_NIGHT);
        break;    
    case "cloudy":
        icons.set("cloudy", Skycons.CLOUDY);
        break;
    case "rain":
        icons.set("rain", Skycons.RAIN);
        break;
    case "sleet":
        icons.set("sleet", Skycons.SLEET);
        break;
    case "snow":
        icons.set("snow", Skycons.SNOW);
        break;   
    case "wind":
        icons.set("wind", Skycons.WIND);
        break;
    case "fog":
        icons.set("fog", Skycons.FOG);
        break;   
}

// icons.set("clear-day", Skycons.CLEAR_DAY);
// icons.set("clear-night", Skycons.CLEAR_NIGHT);
// icons.set("partly-cloudy-day", Skycons.PARTLY_CLOUDY_DAY);
// icons.set("partly-cloudy-night", Skycons.PARTLY_CLOUDY_NIGHT);
// icons.set("cloudy", Skycons.CLOUDY);
// icons.set("rain", Skycons.RAIN);
// icons.set("sleet", Skycons.SLEET);
// icons.set("snow", Skycons.SNOW);
// icons.set("wind", Skycons.WIND);
// icons.set("fog", Skycons.FOG);

icons.play();