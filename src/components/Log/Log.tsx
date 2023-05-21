import React from 'react';
import './Log.css';

interface LogProps {
    messages : string[] | undefined;
}
    
export default function Log({messages}: LogProps) {
    return (
        <div className="log">
            <p>~ The game log ~</p>
            {messages?.map((message, index) => (
                <p className='message' key={index}>- {message}</p>
            ))}
        </div>
    );
}