import React,{Component} from 'react';
import './search.css';

const lurl = "http://3.17.216.66:4000/location";
const rurl = "http://3.17.216.66:4000/restaurant?stateId="
class Search extends Component{

    constructor(){
        super()
        console.log(">>>>insie constructor")
        this.state={
            location:'',
            restData:''
        }
    }

    renderCity = (data) => {
        if(data){
            return data.map((item) => {
                return(
                    <option value={item.state_id} key={item._id}>{item.state}</option>
                )
            })
        }
    }

    renderRest = (data) => {
        if(data){
            return data.map((item) => {
                return (
                    <option value={item.restaurant_id} key={item._id}>
                        {item.restaurant_name} | {item.address}
                    </option>
                )
            })
        }
    }

    handleCity = (event) => {
        console.log(event.target.value);
        let statId = event.target.value
        fetch(`${rurl}${statId}`,{method:'GET'})
        .then((res) => res.json())
        .then((data) => {this.setState({restData:data})})
    }

    render(){
        //console.log(">>>>data",this.state.restData)
        return(
            <>
                <div id="search">
                    <div className="logo">
                        <span>D!</span>
                    </div>
                    <div id="heading">
                        Find Best Place Near You
                    </div>
                    <div id="dropdown">
                        <select onChange={this.handleCity}>
                            <option>----Select Location----</option>
                            {this.renderCity(this.state.location)}
                        </select>
                        <select id="restSelect">
                            <option>----Select Restaurant----</option>
                            {this.renderRest(this.state.restData)}
                        </select>
                    </div>
                </div>
            </>
        )
    }


    //api calling on page load 
    componentDidMount(){
        console.log(">>>>insie componentDidMount")
        fetch(lurl ,{method: 'GET'})
        //return promise
        .then((res) => res.json())
        //return data
        .then((data) => {
            //console.log(data)
            this.setState({location:data})
        })
        .catch((err) => {
            console.log(err)
        })

    }
}

export default Search