import React, { Component } from 'react'
import NavBar from './NavBar'
import Content from './Content'
import Footer from './Footer'
import './App.css'

class App extends Component {

    render(){
        return (

            <div className='app-flex'>
                <NavBar/>
                <main>      
                    <Content/>
                </main>
                <Footer/>
            </div>
    
        )
    }
}


export default App;