import React, {Component} from 'react'

class Content extends Component {
    render(){
        return(
            <div className='container'>
                <div className='row'>
                    <div className='col s7 offset-s2'>
                        <h3>About</h3>
                        <div className='justify-text'>
                            <p>This projects aims provide a platform which allows the analisys of Swift projects repositories from Students of a extension project at Center of Informatics - UFPE.</p>
                            <p>Our goal is to provide a better understating of how knowledge is disseminated between students of this project; Allowing to easily find framework specialists among them.</p>
                        </div>
                    </div>  
                </div> 
            </div>
        )
    }
}

export default Content;