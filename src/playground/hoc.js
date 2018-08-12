import React from 'react';
import ReactDOM from 'react-dom';

const Info = () => (
    <p>this is the react component</p>
) 

const app = (WrappedComponent) => {
    return (props) => (
        <div>
        <p>Sensitive data</p>
        <WrappedComponent/>
        </div>
    )
}

const HOC = app(Info)

ReactDOM.render(<HOC/>,document.getElementById('app'))