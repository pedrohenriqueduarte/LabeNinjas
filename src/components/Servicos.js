import React from "react";
import moment from "moment";
import * as C from './styles'
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './Temas'

export default class Servicos extends React.Component {

    state = {
        valorMin: "",
        valorMax: "",
        buscaServico: "",
        ordenacao: "titulo"
    }

    // ------------Função Geral------------

    componentDidMount = () => {
        this.props.getAllJobs()
    }

    onChangeInputValorMin = (e) => {
        this.setState({ valorMin: e.target.value })
    }

    onChangeInputValorMax = (e) => {
        this.setState({ valorMax: e.target.value })
    }

    onChangeInputBuscaServico = (e) => {
        this.setState({ buscaServico: e.target.value })
    }

    onChangeSelectOrdenacao = (e) => {
        this.setState({ ordenacao: e.target.value })
    }

    render() {

        const servicos = this.props.listaServicos.filter((item) => {
            return item.title.toLowerCase().includes(this.state.buscaServico.toLowerCase()) || item.description.toLowerCase().includes(this.state.buscaServico.toLowerCase())
        })

            .filter((item) => {
                return this.state.valorMin === "" || item.price >= this.state.valorMin
            })

            .filter((item) => {
                return this.state.valorMax === "" || item.price <= this.state.valorMax
            })

            .sort((item, item2) => {
                switch (this.state.ordenacao) {
                    case "titulo":
                        return item.title.localeCompare(item2.title)
                        break;
                    case "menor valor":
                        return item.price - item2.price
                        break;
                    case "maior valor":
                        return item2.price - item.price
                        break;
                    case "prazo":
                        return new Date(item.dueDate).getTime() - new Date(item2.dueDate).getTime()
                    default:
                        return "sem ordenacao"
                }
            })

            .map((item) => {
                return (
                    <C.DivCard key={item.id}>
                        <h3 onClick={() => this.props.mudarPaginaDetalhe(item.id)}>{item.title}</h3>
                        <p>{item.description}</p>
                        <p>Até {moment(item.dueDate).format('DD/MM/YYYY')} por R${item.price},00</p>
                        
                        <C.DivDetalhes>
                            
                            <ThemeProvider theme={theme}>
                                <Button variant="contained" color="primary" onClick={() => this.props.adicionarAoCarrinho(item.id)} >
                                Adicionar ao carrinho
                                </Button>
                            </ThemeProvider>
                        </C.DivDetalhes>
                    </C.DivCard>
                )
            })

        return (

            <div>

                <C.DivFiltro>
                    <div>
                        <input
                            placeholder="Valor Mínimo"
                            onChange={this.onChangeInputValorMin}
                        />
                        <input
                            placeholder="Valor Máximo"
                            onChange={this.onChangeInputValorMax}
                        />
                        <input
                            placeholder="Busca por título ou descrição"
                            onChange={this.onChangeInputBuscaServico}
                        />
                    </div>
                    <div>
                        <select
                            onChange={this.onChangeSelectOrdenacao}
                            value={this.state.ordenacao}
                        >
                            <option value="sem ordenacao">Sem Ordenação</option>
                            <option value="menor valor">Menor Valor</option>
                            <option value="maior valor">Maior Valor</option>
                            <option value="titulo">Título</option>
                            <option value="prazo">Prazo</option>
                        </select>
                    </div>
                </C.DivFiltro>

                <C.DivMainContainer>{servicos}</C.DivMainContainer>

            </div>
        )
    }
}