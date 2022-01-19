import React, { Component } from 'react'
import Cadastro from './Cadastro'
import Servicos from './Servicos'
import Carrinho from './Carrinho'
import Home from './Home'
import axios from 'axios'
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './Temas'
import Logo from '../IMG/logo.png'
import FB from '../IMG/fb.png'
import INSTA from '../IMG/insta.png'
import TT from '../IMG/tt.png'
import * as C from './styles'
import DetalhesServicos from './DetalhesServicos'




export class AppContainer extends Component {
  state = {
    page: "home",
    listaServicos: [],
    jobDetalhes: {}
  }

  // ------------Função Geral------------

  togglePage = () => {
    switch (this.state.page) {
      case "home":
        return <Home/>
        break
      case "queroSerUmNinja":
        return <Cadastro />
        break

      case "contrateUmServico":
        return <Servicos
          listaServicos={this.state.listaServicos}
          getAllJobs={this.getAllJobs}
          adicionarAoCarrinho={this.adicionarAoCarrinho}
          mudarPaginaDetalhe={this.mudarPaginaDetalhe}
        />
        break

      case "carrinho":
        return <Carrinho
          listaServicos={this.state.listaServicos}
          removendoDoCarrinho={this.removendoDoCarrinho}
          finalizarCompra={this.finalizarCompra}
        />
        break

      case "detalhe":
        return <DetalhesServicos 
        jobDetalhes={this.state.jobDetalhes}
        />
        break

      default:
        return <appContainer />
    }
  }

  mudarPaginaHome = () => {
    this.setState({ page: "home" })
  }

  mudarPaginaCadastro = () => {
    this.setState({ page: "queroSerUmNinja" })
  }

  mudarPaginaServicos = () => {
    this.setState({ page: "contrateUmServico" })
  }

  mudarPaginaCarrinho = () => {
    this.setState({ page: "carrinho" })
  }

  mudarPaginaDetalhe = (id) => {
    this.setState({ page: "detalhe" })
    this.getJobById(id)
  }

  finalizarCompra = () => {
    for(let item of this.state.listaServicos){
      this.removendoDoCarrinho(item.id)
    }
    alert("Obrigado pela compra!")
  }
  
  // ------------Função API------------

  adicionarAoCarrinho = (id) => {
    const url = `https://labeninjas.herokuapp.com/jobs/${id}`
    const body = {
      "taken": true
    }

    axios.post(url, body, {
      headers: {
        Authorization: "944276f6-19c0-49d4-ab75-a9d3e31490f9"
      }
    })
      .then((res) => {
        alert("Item adicionado ao carrinho!")
        this.getAllJobs()
      })
      .catch((err) => {
        console.log(err.response.data.message)
      })
  }

  removendoDoCarrinho = (id) => {
    const url = `https://labeninjas.herokuapp.com/jobs/${id}`
    const body = {
      "taken": false
    }

    axios.post(url, body, {
      headers: {
        Authorization: "944276f6-19c0-49d4-ab75-a9d3e31490f9"
      }
    })
      .then((res) => {
        this.getAllJobs()
      })
      .catch((err) => {
        console.log(err.response.data.message)
      })
  }

  getAllJobs = () => {
    const url = "https://labeninjas.herokuapp.com/jobs"
    axios.get(url, {
      headers: {
        Authorization: "944276f6-19c0-49d4-ab75-a9d3e31490f9"
      }
    })
      .then((res) => {
        this.setState({ listaServicos: res.data.jobs })
      })
      .catch((err) => {
        console.log("erro", err)
      })
  }

  getJobById = (id) => {
    const url = `https://labeninjas.herokuapp.com/jobs/${id}`
    axios.get(url, {
      headers: {
        Authorization: "944276f6-19c0-49d4-ab75-a9d3e31490f9"
      }
    })
      .then((res) => {
        this.setState({ jobDetalhes: res.data })
      })
      .catch((err) => {
        console.log("erro", err)
      })
  }

  render() {
    return (

      <C.Global>

        <C.GlobalStyle />

        <C.FlexHeader>

          <div>
            <C.Img src={Logo} onClick={this.mudarPaginaHome} />
            <h1 onClick={this.mudarPaginaHome}>
              Labeninjas
            </h1>
          </div>

          <div>

            <ThemeProvider theme={theme}>
              <Button variant="contained" color="primary" onClick={this.mudarPaginaCadastro} >
                Seja um ninja
              </Button>

              <Button variant="contained" color="primary" onClick={this.mudarPaginaServicos} >
                Serviços
              </Button>

              <Button variant="contained" color="primary" onClick={this.mudarPaginaCarrinho} >
                Carrinho
              </Button>
            </ThemeProvider>

          </div>

        </C.FlexHeader>

        <C.HomeContent>
          {this.togglePage()}
        </C.HomeContent>

        <C.FooterFlex>
          
          <C.RedesSociais>
            
            <h4>Redes Sociais:</h4>

            <div>
            <img src={FB} />
            <img src={INSTA} />
            <img src={TT} />
            </div>

          </C.RedesSociais>

          <C.Canais>
            <div>
              <h4>Atendimento:</h4>
              <p>0800-999-541</p>
              <p>sac@labeninjas.com</p>
            </div>

            <div>
              <h4>Endereço:</h4>
              <p>Travessa Itatiba, número</p>
            </div>
          </C.Canais>

        </C.FooterFlex>


      </C.Global>
    )
  }
}
