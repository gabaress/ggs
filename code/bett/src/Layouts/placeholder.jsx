import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function placeholder() {

    const { id } = useParams();
    const [data, setData] = useState({});

    useEffect(() => {
        fetch(``)
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }, []);

    return (
        <div>

        </div>
    )
}

export default placeholder;