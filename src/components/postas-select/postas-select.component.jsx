import React, { useEffect } from 'react';

const PostasSelect = ({ postas, onSelectChange }) => {

    function handleChange(event) {
        onSelectChange(event.target.value);
    }

    useEffect(() => {
        if(postas){
            onSelectChange(postas[0].id);
        } 
    }, [postas]);

    return (
        postas ?
            <select name="postas" id="postas" onChange={handleChange} >
                {
                    postas.map((posta) =>
                        <option key={posta.id} value={posta.id}>
                            {posta.nombre}
                        </option>)
                }  
            </select> :
            <p></p>
    );
}

export default PostasSelect;