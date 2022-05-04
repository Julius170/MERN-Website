

import Spinner from 'react-bootstrap/Spinner';
import { React } from 'react';


export default function LoadingBox() {
    return (<Spinner animation="border" role="statux">
        <span className="visually-hidden">Loading...</span>
    </Spinner>
    );
}