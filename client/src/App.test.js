import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Auth from './Auth'

it('renders without crashing', () => {
    const auth = new Auth();
    const div = document.createElement('div');
    ReactDOM.render(<App auth={auth} {...props} />)
    ReactDOM.unmountComponentAtNode(div);
});
