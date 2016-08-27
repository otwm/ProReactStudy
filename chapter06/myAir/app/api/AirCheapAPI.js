import 'whatwg-fetch';
import AirportActionCreators from '../actions/AirportActionCreators';

let AirCheapAPI = {
    fetchAirports(){
        fetch('airports.json')
            .then((response) => {
                return response.json();
            })
            .then((responseData) => {
                AirportActionCreators.fetchAirportsSuccess(responseData);
            })
            .catch((error) => {
                AirportActionCreators.fetchAirportsError(error);
            })
    }
};

export default AirCheapAPI;