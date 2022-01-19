import React from "react";
import * as C from './styles';
import moment from "moment";

export default class DetalhesServicos extends React.Component{
    
    render(){
        return(
            <C.DisplayDetalhesServ>
                <C.DivDetalhesServ>
                    <h3>Descrição do trabalho: </h3>
                    <p>{this.props.jobDetalhes.description}</p>
                    <h3>Formas de pagamento:</h3>
                    <p> {this.props.jobDetalhes.paymentMethods}</p>
                    <h3>Valor: </h3>
                    <p> R${this.props.jobDetalhes.price}</p>
                    <h3>Disponível até:</h3>
                    <p> {moment(this.props.jobDetalhes.dueDate).format('DD/MM/YYYY')}</p>
                </C.DivDetalhesServ>
            </C.DisplayDetalhesServ>
        )
    }
}