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
    },

    fetchTickets(origin, destination){
        fetch('flight.json')
            .then((response) => response.json())
            .then((responseData) => {
                AirportActionCreators.fetchTicketsSuccess(responseData);
            })
            .catch((error) => {
                AirportActionCreators.fetchTicketsError(error);
            });
    }
};

export default AirCheapAPI;