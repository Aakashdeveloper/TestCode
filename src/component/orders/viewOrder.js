import React,{Component} from 'react';
import axios  from 'axios';
import Display from './displayOrder';
import Header from '../../header';

const placeOrder = "http://localhost:2345/orders";

class ViewOrder extends Component{

    constructor(props){
        super(props)

        this.state={
            orders:'',
            email:''
        }
    }

    render(){
        if(sessionStorage.getItem('loginStatus') === 'LoggedOut'){
            return(
                <>
                    <Header/>
                    <center>
                        <h2>Login First to Check Orders</h2>
                    </center>
                </>
            )
        }
        return(
            <>
            <Header/>
                <Display orderData={this.state.orders}/>
            </>
        )
    }

    componentDidMount(){
        if(this.props.location){
            let query = this.props.location.search.split('&');
            if(query){
                let data={
                    "status":query[0].split('=')[1],
                    "date":query[2].split('=')[1],
                    "bank_name":query[3].split('=')[1]
                }
                let id = query[1].split('=')[1].split('_')[1];
                fetch(`${placeOrder}/${id}`,{
                    method:'PATCH',
                    headers:{
                        'Accept':"application/json",
                        'Content-Type':'application/json'
                    },
                    body:JSON.stringify(data)
                })
            }
        }
        axios.get(`${placeOrder}`).then((res) => {this.setState({orders:res.data})})
    }

}

export default ViewOrder;