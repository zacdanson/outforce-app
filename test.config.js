const Enzyme = require('enzyme');
import Adapter from 'enzyme-adapter-react-16';
window.$ = require('jquery');

// Setup enzyme's react adapter
Enzyme.configure({adapter: new Adapter()});
