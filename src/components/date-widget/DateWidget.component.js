import { Button } from '../elements';
import { Select } from 'grommet';

const DateWidget = props => {
  return (
    <div className={'date-widget-container ' + props.class}>
      <div className="date-widget-arrow-container">
        <Button
          className="date-widget-arrow"
          name="prev"
          onClick={() => props.updateDates('prev')}
          icon={<i className="fa fa-arrow-left" />}
        />
        <Button
          className="date-widget-arrow"
          name="next"
          onClick={() => props.updateDates('next')}
          icon={<i className="fa fa-arrow-right" />}
        />
      </div>
      <div className="date-widget-date">
        {moment(props.from, 'x').format('MMM DD') + ' - ' + moment(props.to, 'x').format('MMM DD, YYYY')}
      </div>
    </div>
  );
};

export default DateWidget;
