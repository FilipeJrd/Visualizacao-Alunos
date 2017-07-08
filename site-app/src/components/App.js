import React, { Component } from 'react'
import NavBar from './NavBar'
import Content from './Content'
import Footer from './Footer'
import Visualization from './Visualization'
import './App.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'


class App extends Component {

    render(){
        return (

            <div className='app-flex'>
                <NavBar/>
                <main>
                    {/*<Router>
                        <div>
                         <Route exact path="/" component={Content}/>
                         <Route path="/visulizations" component={Visualization}/>
                         </div>
                    </Router>*/}
                    <Content/>
                </main>
                <Footer/>
            </div>
    
        )
    }
}


export default App;