import React, {Component} from 'react'
import screenShoot from '../data/screenshot.png'

class Content extends Component {
    render(){
        return(
            <div className='container'>
                <div className='row'>
                    <div className='col s8 offset-s2'>
                        <h3>About</h3>
                        <div className='justify-text'>
                            <blockquote >
                            <p>This projects aims provide a platform which allows the analisys of Swift projects repositories from Students of a extension project at Center of Informatics - UFPE.</p>
                            <p>Our goal is to provide a better understating of how knowledge is disseminated between students of this project; Allowing to easily find framework specialists among them.</p>
                            </blockquote>
                        </div>
                    </div>  
                </div> 
                <div className='row'>
                    <div className='col s8 offset-s2'>
                        <h3>How does it work?</h3>
                        <div className='justify-text'>
                            <blockquote >
                            <p>This platform has basically three simple visualizations: framework’s histogram,  collaboration’s forced graph and heat-map matrix of frameworks per person. They receptively analise: how many times a frame work appears in all projects we collected and how many times a framework was used within a project; who were the students that worked together; and who many times a person used a specific framework.</p>
                            <p>We have created these visualizations using <a href="https://d3js.org">d3.js</a> and <a href="http://materializecss.com/">materializecss</a>.</p>
                            </blockquote>
                        </div>
                    </div>  
                </div>

                <div className='row'>
                    <div className='col s8 offset-s2'>
                        <h3>Demo(work-in-progress)</h3>
                         <a href="#!"><img className="responsive-img" src={screenShoot}/></a>
                    </div>  
                </div>

                
                <div className='row'>
                    <div className='col s8 offset-s2'>
                        <h3>Links</h3>
                        <div className="collection">
                            <a href="https://github.com/FilipeJrd/Visualizacao-Alunos/raw/master/Presentations/proposta.pdf" className="collection-item light-blue-text text-darken-2">Proposal Presentation</a>
                            <a href="#!" className="collection-item light-blue-text text-darken-2">Data</a>
                        </div>
                    </div>  
                </div> 
            </div>
        )
    }
}

export default Content;