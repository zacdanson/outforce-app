'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _mergeClassNames = require('merge-class-names');

var _mergeClassNames2 = _interopRequireDefault(_mergeClassNames);

var _dates = require('../shared/dates');

var _propTypes3 = require('../shared/propTypes');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var className = 'react-calendar__century-view__decades__decade';

var Decade = function Decade(_ref) {
  var classes = _ref.classes,
      date = _ref.date,
      decade = _ref.decade,
      maxDate = _ref.maxDate,
      minDate = _ref.minDate,
      onClick = _ref.onClick,
      onMouseOver = _ref.onMouseOver,
      style = _ref.style,
      tileClassName = _ref.tileClassName,
      tileContent = _ref.tileContent;
  return _react2.default.createElement(
    'button',
    {
      className: _mergeClassNames2.default.apply(undefined, [className].concat(_toConsumableArray(classes), [tileClassName instanceof Function ? tileClassName({ date: date, view: 'century' }) : tileClassName])),
      disabled: minDate && (0, _dates.getBeginOfDecade)(minDate) > date || maxDate && (0, _dates.getEndOfDecade)(maxDate) < date,
      onClick: onClick && function () {
        return onClick(date);
      },
      onMouseOver: onMouseOver && function () {
        return onMouseOver(date);
      },
      onFocus: onMouseOver && function () {
        return onMouseOver(date);
      },
      style: style,
      type: 'button'
    },
    _react2.default.createElement(
      'time',
      { dateTime: decade + 'T00:00:00.000' },
      (0, _dates.getDecadeLabel)(decade)
    ),
    typeof tileContent === 'function' ? tileContent({ date: date, view: 'century' }) : tileContent
  );
};

Decade.propTypes = _extends({
  decade: _propTypes2.default.number.isRequired
}, _propTypes3.tileProps);

exports.default = Decade;