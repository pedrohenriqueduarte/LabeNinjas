import React from "react";
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './Temas'
import * as C from './styles'


export default class Carrinho extends React.Component {

    // ------------Função Geral------------

    calcularValorTotal = () => {
        let valorTotal = 0
        for (let item of this.props.listaServicos) {
            if (item.taken) {
                valorTotal += item.price
            }
        }
        return valorTotal
    }

    render() {

        const carrinho = this.props.listaServicos.map((item) => {
            if (item.taken) {
                return (<C.DivCarrinho key={item.id}>
                    <div>
                    <p>{item.title}</p>
                    <p>${item.price}</p>
                    </div>
                    
                    <ThemeProvider theme={theme}>
                        <Button variant="contained" color="primary"  onClick={() => this.props.removendoDoCarrinho(item.id)} >
                        Remover
                        </Button>
                    </ThemeProvider>
                </C.DivCarrinho>)
            }
        })

        return (

            <C.DisplayCarrinho>

                <h1>Carrinho</h1>

                {carrinho}
                
                <div>
                    <p>Total: ${this.calcularValorTotal()}</p>
                    <ThemeProvider theme={theme}>
                                <Button variant="contained" color="primary" onClick={this.props.finalizarCompra} >
                                Finalizar
                                </Button>
                    </ThemeProvider>
                </div>
            </C.DisplayCarrinho>
        )
    }
}