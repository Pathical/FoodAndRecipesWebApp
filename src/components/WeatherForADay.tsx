
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import * as React from 'react';



class WeatherForADayApp extends React.Component<{ dataForThisDay: any, cityName: any, countryCode: any }> {

    // This method gets the image which represents the weather type 
    public getIcon(): string {
        return "https://www.weatherbit.io/static/img/icons/" + this.props.dataForThisDay.weather.icon + ".png"
    }

    // This method takes a string, converts it to a number, rounds it.
    public roundString(arg: string): number{
        return Math.round(Number.parseFloat(arg));
    }

    // Takes a string representation of a date (from the RESTful api)
    // Creates a new Date object
    // Take only the necessary parts of the Date object
    public convertDate(arg: string): string{
        const converted = new Date(arg);        const splitted = converted.toDateString().split(' ');
        return splitted[0] + ' ' + splitted[2] + ' ' + splitted[1] + ' ' + splitted[3];
    }

    // This render function helps create a Card from material UI
    // Shows weather information for a particular date
    public render() {
        return (
            <div className='col-xs-1'>
                <Card style={{borderRadius:"20px"}} className='MuiPaper-elevation1-12 weatherCard'>
                    <CardContent>
                        <Typography gutterBottom={false} style={{ fontSize: "2.5em"}}>
                            {this.props.cityName}, {this.props.countryCode}
                        </Typography>
                        <Typography style={{ fontSize: "1.6em"}}  >
                            {this.props.dataForThisDay.weather.description}
                        </Typography>
                        <div >
                            <img src={this.getIcon()} width='50%' />
                        </div>
                        <Typography  style={{ fontSize: "2em" }}>
                            {this.props.dataForThisDay.max_temp} °C
                        </Typography>
                        <Typography  style={{ fontSize: "1.6em" }}>
                            {this.convertDate(this.props.dataForThisDay.valid_date)}
                        </Typography>
                        <Typography  style={{ fontSize: "1.2em" }}>
                            Percipitation: {this.props.dataForThisDay.pop} %
                        </Typography>
                        <Typography  style={{ fontSize: "1.2em" }}>
                            Humidity: {this.props.dataForThisDay.rh} %
                        </Typography>
                        <Typography  style={{ fontSize: "1.2em" }}>
                            Wind speed: {this.roundString(this.props.dataForThisDay.wind_gust_spd)} km/h
                        </Typography>
                        <Typography  style={{ fontSize: "1.2em" }}>
                            UV index: {this.roundString(this.props.dataForThisDay.uv)}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        );
    }
}

export default (WeatherForADayApp);