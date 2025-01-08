import React from 'react';

interface BoxProps {
    title: string;
    content: string[];
}

const Box: React.FC<BoxProps> = ({ title, content }) => {
    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', marginBottom: '10px' }}>
            <strong>{title}:</strong>
            <div>{content.join('・')}</div>
        </div>
    );
};

export default Box;