import React , {Component} from 'react'

class Footer extends Component {

    render() {
        return (
            <footer className="page-footer light-blue darken-2">
                <div className="container">
                    <div className="row">
                    <div className="col l4 offset-l2 s12">
                        <h5 className="white-text">Github Owners Links</h5>
                        <ul>
                        <li><a className="grey-text text-lighten-3" href="#!">Filipe Nogueira</a></li>    
                        <li><a className="grey-text text-lighten-3" href="#!">Isabel Lima</a></li>
                        <li><a className="grey-text text-lighten-3" href="#!">Isabelly Damascena</a></li>
                        </ul>
                    </div>
                    </div>
                </div>
                <div className="footer-copyright">
                    <div className="container center">
                    © 2017 Copyright
                    </div>
                </div>
            </footer>
        )
    }

}

export default Footer;