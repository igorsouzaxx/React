import React, {Component} from 'react'
import './Calculator.css'

import Button from '../components/Button'
import Display from '../components/Display'

const initialState= {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0, 0],
    current: 0
}

export default class Calculator extends Component{

    state = {...initialState }

    constructor(props) {
        super(props)

        this.clearMemory = this.clearMemory.bind(this);
        this.setOperation = this.setOperation.bind(this);
        this.addDigit = this.addDigit.bind(this);
    }

    clearMemory(){
        this.setState({ ...initialState })
    }

    setOperation(operation){
        if (this.state.current === 0) {
            this.setState({ operation, current: 1,clearDisplay: true})
        } else{
            const equals = operation === '='
            const currentOperation = this.state.operation //A forma de fazer uma segunda operação sem ter clicado no "igual"

            const values = [...this.state.values] //Clonagem para preparar a operação
            try {//try catch é necessário por causa da função eval ao tentar realizar múltiplas operações 
            // eslint-disable-next-line    
                values[0] = eval(`${values[0]} ${currentOperation} ${values[1]}`) //Linha em que a operação é fatorada através do "eval"
            } catch(e) {
                values[0] = this.state.values[0]
            }

            this.setState({ //Comunicação do backend com o frontend
                displayValue: values[0], //mostra o valor no display
                operation: equals ? null : operation, //se o usuário clicar em uma operação e antes dela não existir operação
                current: equals ? 0 : 1, //determina em qual valor do array estará operando: se o usuário apertou "=" vai pro primeiro valor(0), se apertou outro operador, vai pro segundo valor do array(1)
                clearDisplay: !equals, //se for diferente de equals, irá limpar o display
                values//passando os valores pra salvar no state e exibir resultados 
            })
        }

    }

    addDigit(n) {
        if (n === '.' && this.state.displayValue.includes('.')) { // Tratamento para não existir um número com dois ou mais pontos
            return
        }

        const clearDisplay = this.state.displayValue === '0' 
            || this.state.clearDisplay //Verificação se precisa limpar o display
        const currentValue = clearDisplay ? '' : this.state.displayValue //Se sim, o valor será vazio e se não, será o valor que está atualmente no display
        const displayValue = currentValue + n //  
        this.setState({ displayValue, clearDisplay: false }) //essa parte representa a aplicação da mudança visual no display da calculadora

        if (n !== '.') {
            const i = this.state.current //índice do valor que está alterando
            const newValue = parseFloat(displayValue) //Conversão desse valor para tipo Float
            const values = [...this.state.values] //Clonagem com spread em um novo array
            values[i] = newValue //Alteração do valor atual baseado no índice do array
            this.setState({values}) //Validação da alteração do valor através da mudança no state
            console.log(values)
        }
    }

    render(){
        return (
        <div className="calculator">
            <Display value={this.state.displayValue} />
            <Button label="AC" click={this.clearMemory} triple />
            <Button label="/" click={this.setOperation} operation />
            <Button label="7" click={this.addDigit} />
            <Button label="8" click={this.addDigit} />
            <Button label="9" click={this.addDigit} />
            <Button label="*" click={this.setOperation} operation />
            <Button label="4" click={this.addDigit} />
            <Button label="5" click={this.addDigit} />
            <Button label="6" click={this.addDigit} />
            <Button label="-" click={this.setOperation} operation />
            <Button label="1" click={this.addDigit} />
            <Button label="2" click={this.addDigit} />
            <Button label="3" click={this.addDigit} />
            <Button label="+" click={this.setOperation} operation />
            <Button label="0" click={this.addDigit} double />
            <Button label="." click={this.addDigit} />
            <Button label="=" click={this.setOperation} />
        </div>
        )
    }
}