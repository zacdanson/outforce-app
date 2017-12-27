# react-events-calendar
Events calendar for React.

**Work in progress**

## Installation
The package can be installed via NPM

```
npm install react-events-calendar --save
```


## Usage

```javascript
import ReactEventsCalendar from 'react-events-calendar';

...

render() {
    <ReactEventsCalendar ref="calendar"
                         events={this.state.events}
                         onDateSelect={this.handleSelectedDate}
                         onMonthChange={this.handleMonthChange}
    />
}
```
See [Examples](examples/) for more details.

## Props

- **events** {array} Array of events
- **defaultView** {string} Default calendar view (day, week or month)
- **onDateSelect** {function} Callback when a date is selected
- **onMonthChange** {function} Callback when the month as changed

## API
- **getEvents(date)** Return events for a given date

## Screenshots
### Month view

![Month View][1]  

[1]: https://raw.githubusercontent.com/almeidarruben/react-events-calendar/master/screenshots/month_view.png

### Week view

![Week View][2]  

[2]: https://raw.githubusercontent.com/almeidarruben/react-events-calendar/master/screenshots/week_view.png

### Day view

![Day View][3]  

[3]: https://raw.githubusercontent.com/almeidarruben/react-events-calendar/master/screenshots/day_view.png

## TODO
- Highlight current day on week view
- Jump to current hour or first event of the day on day view
- Tests
- Static validate

## Contributions
When contributing, please work on the `src` directory.

The following command will run webpack with watch and compile code as it changes.

```
npm run dev
```

## License
MIT
