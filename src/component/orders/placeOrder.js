import React,{Component} from 'react';
import './placeOrder.css';
import Header from '../../header';

const url = "http://3.17.216.66:4000/menuItem";
const placeOrder = "http://localhost:2345/orders";

class PlaceOrder extends Component {
    constructor(props) {
        super(props)
        let sessionData = JSON.parse(sessionStorage.getItem('userInfo'))
        this.state={
            id:Math.floor(Math.random() * 10000),
            hotel_name:this.props.match.params.restName,
            name:sessionData?sessionData['name']:'',
            email:sessionData?sessionData['email']:'',
            phone:sessionData?sessionData['phone']:'',
            cost:0,
            address:'UH 66 Y, Delhi',
            menuItem:''
        }
    }

    handleChange = (event) => {
       this.setState({[event.target.name]:event.target.value})
    }

    handleCheckOut = () => {
        let obj = this.state;
        obj.menuItem = sessionStorage.getItem('menu');
        fetch(placeOrder,{
            method:'POST',
            headers:{
                'accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify(obj)
        })
        //.then(this.props.history.push('/viewOrder'))
        .then(console.log('Order Added'))
    }

    renderItem = (data) => {
        if(data){
            return data.map((item) => {
                return(
                    <div className="orderItems" key={item.menu_id}>
                        <img src={item.menu_image} alt={item.menu_name}/>
                        <h3>{item.menu_name}</h3>
                        <h4>Rs. {item.menu_price}</h4>
                    </div>
                )
            })
        }
    }

    render(){
        if(sessionStorage.getItem('loginStatus') === 'LoggedOut'){
            return(
                <>
                    <Header/>
                    <center>
                        <h2>Login First to Place Orders</h2>
                    </center>
                </>
            )
        }
        return(
            <>
            <Header/>
                <div className="container">
                    <div className="panel panel-primary">
                        <div className="panel-heading">
                            <h3>Your Order Form Restaurant {this.props.match.params.restName}</h3>
                        </div>
                        <div className="panel-body">
                            <form action="http://localhost:4100/paynow" method="POST">
                                <div className="row">
                                    <input type="hidden" name="cost" value={this.state.cost}/>
                                    <input type="hidden" name="id" value={this.state.id}/>
                                    <input type="hidden" name="hotel_name" value={this.state.hotel_name}/>
                                    <div className="form-group col-md-6">
                                        <label>Name</label>
                                        <input className="form-control" name="name" value={this.state.name}
                                        onChange={this.handleChange}/>
                                    </div> 
                                    <div className="form-group col-md-6">
                                        <label>Email</label>
                                        <input className="form-control" name="email" value={this.state.email}
                                        onChange={this.handleChange}/>
                                    </div> 
                                    <div className="form-group col-md-6">
                                        <label>Phone</label>
                                        <input className="form-control" name="phone" value={this.state.phone}
                                        onChange={this.handleChange}/>
                                    </div> 
                                    <div className="form-group col-md-6">
                                        <label>Address</label>
                                        <input className="form-control" name="address" value={this.state.address}
                                        onChange={this.handleChange}/>
                                    </div> 
                                </div>
                                {this.renderItem(this.state.menuItem)}
                                <div className="row">
                                    <div className="col-md-12">
                                        <h2>Total Price is Rs.{this.state.cost}</h2>
                                    </div>
                                </div>
                                <button className="btn btn-success" 
                                type="submit"
                                onClick={this.handleCheckOut}>
                                    CheckOut
                                </button>

                            </form>
                        </div>
                    </div>
                </div>
            </>
        ) 
    }

    componentDidMount(){
        let menuItem = sessionStorage.getItem('menu');
        let orderId = [];
        menuItem.split(',').map((item) => {
            orderId.push(parseInt(item))
            return 'ok'
        })
        fetch(url,{
            method: 'POST',
            headers:{
                'accept':'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderId)
        })
        .then((res) => res.json())
        .then((data) => {
            //console.log(data)
            let totalPrice = 0;
            data.map((item) => {
                totalPrice += Number(item.menu_price)
                return 'ok'
            })
            this.setState({menuItem:data,cost:totalPrice})
        })

    }

}

export default PlaceOrder;