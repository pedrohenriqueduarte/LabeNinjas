import React from "react";
import axios from "axios";
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './Temas'
import * as C from './styles'


export default class Cadastro extends React.Component {
    state = {
        inputTitulo: "",
        inputDescricao: "",
        inputPreco: "",
        inputData: "",
        checkBoxCredito: false,
        checkBoxDebito: false,
        checkBoxBoleto: false,
        checkBoxPix: false,
    }

    // ------------Função Geral------------

    onChangeInputTitulo = (e) => {
        this.setState({ inputTitulo: e.target.value })
    }

    onChangeInputDescricao = (e) => {
        this.setState({ inputDescricao: e.target.value })
    }

    onChangeInputPreco = (e) => {
        this.setState({ inputPreco: Number(e.target.value) })
    }

    onChangeInputsPagamentos = (e) => {
        this.setState({ [e.target.name]: e.target.checked });
    };

    onChangeInputData = (e) => {
        this.setState({ inputData: e.target.value });
    };

    // ------------Função API------------

    criarTrabalho = () => {
        const url = "https://labeninjas.herokuapp.com/jobs"

        const copiaPagamento = [];

        if (this.state.checkBoxCredito === true) {
            copiaPagamento.push("Crédito");
        }

        if (this.state.checkBoxDebito === true) {
            copiaPagamento.push("Débito");
        }

        if (this.state.checkBoxBoleto === true) {
            copiaPagamento.push("Boleto");
        }

        if (this.state.checkBoxPix === true) {
            copiaPagamento.push("Pix");
        }

        const body = {
            title: this.state.inputTitulo,
            description: this.state.inputDescricao,
            price: this.state.inputPreco,
            paymentMethods: copiaPagamento,
            dueDate: this.state.inputData,
        }
        axios.post(url, body, {
            headers: {
                Authorization: "944276f6-19c0-49d4-ab75-a9d3e31490f9"
            }
        })
            .then((res) => {
                alert("Serviço cadastrado com sucesso!")
                this.setState({
                    inputTitulo: "",
                    inputDescricao: "",
                    inputPreco: "",
                    inputData: "",
                })
            })
            .catch((err) => {
                console.log("deu ruim", err.response.data.errors)
            })
    }


    render() {

        return (
            <C.DivMainCadastro>

                <C.DivCadastro>

                    <div>
                        <C.DivInputs>
                            <label>Título:</label>
                            <input
                                value={this.state.inputTitulo}
                                onChange={this.onChangeInputTitulo} />
                        </C.DivInputs>

                        <C.DivInputs>
                            <label>Descrição:</label>
                            <input
                                value={this.state.inputDescricao}
                                onChange={this.onChangeInputDescricao} />
                        </C.DivInputs>
                        <C.DivInputs>
                            <label>Preço:</label>
                            <input
                                type="number"
                                value={this.state.inputPreco}
                                onChange={this.onChangeInputPreco} />
                        </C.DivInputs>
                        <C.DivInputs>
                            <input
                                name="checkBoxCredito"
                                type="checkbox"
                                checked={this.state.checkBoxCredito}
                                onChange={this.onChangeInputsPagamentos}
                            />
                            <label>crédito</label>
                            <input
                                name="checkBoxDebito"
                                type="checkbox"
                                checked={this.state.checkBoxDebito}
                                onChange={this.onChangeInputsPagamentos}
                            />
                            <label>débito</label>
                            <input
                                name="checkBoxBoleto"
                                type="checkbox"
                                checked={this.state.checkBoxBoleto}
                                onChange={this.onChangeInputsPagamentos}
                            />
                            <label>boleto</label>
                            <input
                                name="checkBoxPix"
                                type="checkbox"
                                checked={this.state.checkBoxPix}
                                onChange={this.onChangeInputsPagamentos}
                            />
                            <label>pix</label>
                        </C.DivInputs>

                        <C.DivInputs>
                            <label>Data:</label>
                            <input
                                type="date"
                                value={this.state.inputData}
                                onChange={this.onChangeInputData} />
                        </C.DivInputs>
                    </div>
                    <C.DivButton>
                        <ThemeProvider theme={theme}>
                            <Button variant="contained" color="primary" onClick={this.criarTrabalho} >
                                Cadastrar
                            </Button>
                        </ThemeProvider>
                    </C.DivButton>
                </C.DivCadastro>
            </C.DivMainCadastro>
        )
    }
}