import React from 'react'
import './Button.css'
// eslint-disable-next-line
export default props => { 
    let classes = 'button '
// Não esquecer de dar um espaço após chamar uma classe do css!!!!    
    classes += props.operation ? 'operation ' : ''
    classes += props.double ? 'double ' : ''
    classes += props.triple ? 'triple ' : ''
// código em javascript puro referenciando as classes criadas no Button.css    
    return (
    <button 
        onClick={e => props.click && props.click(props.label)}
// a função props.click também poderia receber o paramêtro "e.target.innerHTML" que funcionaria da mesma forma       
        className={classes}>
        {props.label}
    </button>
    )
}
