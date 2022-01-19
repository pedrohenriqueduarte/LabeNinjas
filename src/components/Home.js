import React from 'react'
import * as C from './styles'
import { IconContext } from "react-icons";
import { GrCode } from "react-icons/gr";
import { GrConfigure } from "react-icons/gr";
import { GrCafeteria } from "react-icons/gr";
import { GrCoatCheck } from "react-icons/gr";
import { GrCar } from "react-icons/gr";
import { GrBaby } from "react-icons/gr";

export default class Home extends React.Component {
    render() {
        return (
            <C.DisplayHome>
                <C.CardHomeSemFlex>
                    <h1>Aqui você procura, aqui você acha</h1>
                    <p>LabeNinjas é a maior plataforma de contratação de serviços do Brasil. Conectamos Profissionais de todo o Brasil com pessoas solicitando serviço, atendendo com qualidade, facilidade e rapidez todos os tipos de necessidade.</p>
                </C.CardHomeSemFlex>


                <C.CardIcon>
                    <div>
                        <IconContext.Provider value={{ size: '45px' }}>
                            <div>
                                <GrConfigure />
                                <p>Assistência Técnica</p>
                            </div>
                        </IconContext.Provider>
                    </div>

                    <div>
                        <IconContext.Provider value={{ size: '45px' }}>
                            <div>
                                <GrCode />
                                <p>Tecnologia</p>
                            </div>
                        </IconContext.Provider>
                    </div>

                    <div>
                        <IconContext.Provider value={{ size: '45px' }}>
                            <div>
                                <GrCafeteria />
                                <p>Eventos</p>
                            </div>
                        </IconContext.Provider>
                    </div>

                    <div>
                        <IconContext.Provider value={{ size: '45px' }}>
                            <div>
                                <GrCoatCheck />
                                <p>Moda</p>
                            </div>
                        </IconContext.Provider>
                    </div>

                    <div>
                        <IconContext.Provider value={{ size: '45px' }}>
                            <div>
                                <GrCar />
                                <p>Autos</p>
                            </div>
                        </IconContext.Provider>
                    </div>

                    <div>
                        <IconContext.Provider value={{ size: '45px' }}>
                            <div>
                                <GrBaby />
                                <p>Cuidadores</p>
                            </div>
                        </IconContext.Provider>
                    </div>

                </C.CardIcon>
        </C.DisplayHome>

  

        )}
}