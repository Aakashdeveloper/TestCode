import React,{Component} from 'react';
import './quicksearch.css';
import QuickDisplay from './quickSearch';

const qurl = "http://3.17.216.66:4000/quicksearch"

class QuickSearch extends Component{

    constructor(){
        super()

        this.state={
            mealType:''
        }
    }

    render(){
        return(
            <>
            <div id="quickSearch">
                <span id="QuickHeading">
                    Quick Search
                </span>
                <span id="QuickSubHeading">
                    Find Restaurants By Meal Type
                </span>
                <QuickDisplay mealData={this.state.mealType}/>
            </div>
            </>
        )
    }

    //api calling 
    componentDidMount(){
        fetch(qurl,{method: 'GET'})
        .then((res) =>  res.json())
        .then((data) => {
            this.setState({mealType:data})
        })
    }
}

export default QuickSearch