import React from 'react';
import ReactDOM from "react-dom";
import moment from 'moment';
import './style.scss';
import ReactEventsCalendar from 'react-events-calendar';

class BasicExample extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            events: [
                {
                    id: 1,
                    startDate: moment(new Date(2016, 8, 14, 10, 0)),
                    endDate: moment(new Date(2016, 8, 14, 14, 0))
                },
                {
                    id: 2,
                    startDate: moment(new Date(2016, 8, 16, 16, 0)),
                    endDate: moment(new Date(2016, 8, 16, 18, 0))
                },
                {
                    id: 3,
                    startDate: moment(new Date(2016, 8, 16, 20, 0)),
                    endDate: moment(new Date(2016, 8, 16, 21, 0))
                }
            ],
            newEvent: false,
            selectedDateEvents: null
        }
    }

    handleSelectedDate = (date) => {
        this.setState({
            selectedDateEvents: this.refs.calendar.getEvents(date)
        });
    };

    handleMonthChange = (month) => {
        // TODO: Month changed
    };

    renderEvents = () => {
        const events = [];
        for (let event of this.state.selectedDateEvents) {
            events.push(
                <div className="list__item"
                     key={event.id}
                >
                    <div className="row">
                        <div className="row__column">
                            <small>From</small>
                        </div>
                        <div className="row__column">
                            <small>To</small>
                        </div>
                    </div>
                    <div className="row">
                        <div className="row__column">
                            {event.startDate.format('HH:mm')}
                        </div>
                        <div className="row__column">
                            {event.endDate.format('HH:mm')}
                        </div>
                    </div>
                </div>
            );
        }

        if (events.length === 0) {
            return (
                <h2>No events to display</h2>
            )
        }
        return (
            <div>
                <h1>Events</h1>
                <div className="list">
                    {events}
                </div>
            </div>
        );
    };

    render() {
        let events = null;
        if (this.state.selectedDateEvents) {
            events = this.renderEvents();
        }

        return (
            <div>
                <ReactEventsCalendar ref="calendar"
                                     events={this.state.events}
                                     onDateSelect={this.handleSelectedDate}
                                     onMonthChange={this.handleMonthChange}
                />

                {events}
            </div>
        );
    }
}

ReactDOM.render(<BasicExample/>, document.getElementById("example"));
