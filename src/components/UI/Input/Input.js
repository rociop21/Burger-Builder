import React from 'react';

const input = (props) => {
    
    let inputElement = null;
    const inputClases = ['inputElement'];

    if (props.invalid && props.touched) {
        inputClases.push('Invalid');
    }

    switch (props.inputtype) {
        case ('text'):
            inputElement = <input 
                className={inputClases.join(' ')}
                {...props.fieldconfig} 
                value={props.value} 
                onChange={props.changed}/>
            break;

        case ('textarea'):
            inputElement = <textarea 
                className={inputClases.join(' ')}
                {...props.fieldconfig} 
                value={props.value} 
                onChange={props.changed}/>
            break;

        case ('select'):
            inputElement = <select 
                className={inputClases.join(' ')}
                {...props.fieldconfig} 
                value={props.value} 
                onChange={props.changed}>
                    {props.fieldconfig.options.map( option => (
                        <option value={option.value} key={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
            </select>
            break;
    
        default:
            inputElement = <input 
                        className={inputClases.join(' ')}
                {...props.fieldconfig} 
                value={props.value} 
                onChange={props.changed}/>
            break;
    }
    
    
    return(
        <div>
            <label>{props.label}</label>
            {inputElement}  
        </div>
    );
    
};

export default input;