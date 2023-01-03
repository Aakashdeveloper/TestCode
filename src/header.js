import React,{Component} from 'react';
import './header.css'
import {Link,withRouter} from 'react-router-dom'

const url = "http://3.17.216.66:5000/api/auth/userinfo";
class Header extends Component {
    constructor(props){
        super(props)

        this.state={
            userData:'',
            username:'',
            userImg:''
        }
    }

    hanldeLogout = () => {
        sessionStorage.removeItem('userInfo')
        sessionStorage.removeItem('ltk')
        sessionStorage.removeItem('uName');
        sessionStorage.removeItem('uImg');
        sessionStorage.setItem('loginStatus','LoggedOut')
        this.setState({userData:'',username:'',userImg:''})
        this.props.history.push('/')
    }

    conditionalRender = () => {
        if(this.state.userData.name || sessionStorage.getItem('uName') !== null){
            if(sessionStorage.getItem('uName') !== null){
                let name = sessionStorage.getItem('uName');
                let image = sessionStorage.getItem('uImg');
                <>
                    <Link className="btn btn-info" to="/">
                        Hi <img src={image} style={{height:50,width:50}}/> {name}
                    </Link> &nbsp;
                    <button className="btn btn-danger" onClick={this.hanldeLogout}>
                        <span className='glyphicon glyphicon-log-out'></span> Logout
                    </button>
                </>
            }
            else{
                let data = this.state.userData;
                sessionStorage.setItem('userInfo',JSON.stringify(data));
                sessionStorage.setItem('loginStatus','LoggedIn')
                return(
                    <>
                        <Link className="btn btn-info" to="/">
                            <span className='glyphicon glyphicon-user'></span> Hi {data.name}
                        </Link> &nbsp;
                        <button className="btn btn-danger" onClick={this.hanldeLogout}>
                            <span className='glyphicon glyphicon-log-out'></span> Logout
                        </button>
                    </>
                )
            }
        }
        else{
            return(
                <>    
                    <a className="btn btn-info" href="https://github.com/login/oauth/authorize?client_id=930f92e500db2f4d357c">
                        Login With Github
                    </a> &nbsp;            
                    <Link className="btn btn-success" to="/login">Login</Link> &nbsp;
                    <Link className="btn btn-danger" to="/register">Register</Link>
                </>

            )
        }
    }

    render(){
        return(
            <header>
                <div id="brand">
                    Developer Funnel
                    &nbsp;&nbsp;<Link className="btn btn-success" to="/">Home</Link>
                </div>

                <div id="loginBtn">
                    {this.conditionalRender()}
                </div>
            </header>
        )
    }


    componentDidMount(){
        if(this.props.location.search){
            if(this.props.location.search.split('=')[0] === '?code'){
                var code = this.props.location.search.split('=')[0][1]
            }
            if(code){
                let requestedData = {
                    code:code
                }
                fetch(`http://localhost:9900/oauth`,{
                    method: 'POST',
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body:JSON.stringify(requestedData)
                })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data)
                    let username = data.name;
                    let img = data.avatar_url;
                    sessionStorage.setItem('uName',username);
                    sessionStorage.setItem('uImg',img);
                    sessionStorage.setItem('loginStatus','LoggedIn')
                    this.setState({username:username,userImg:img})
                })
            }
        }else{
            fetch(url,{
                method:'GET',
                headers:{
                    'x-access-token':sessionStorage.getItem('ltk')
                }
            })
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    userData:data
                })
            })
        }
        
    }


    
}

export default withRouter(Header)