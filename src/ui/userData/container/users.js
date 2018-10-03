import React,{Component} from "react";
import axios from "axios";
// import 'bootstrap/dist/css/bootstrap.min.css';
import "../css/user.css"
import AreaGraph from "../component/graph";
import {UserDetails} from "../component/userDetails"
import FloatingLabelInput from "react-floating-label-paper-input";
export default class Users extends Component{
    constructor(props){
        super(props);
        this.state = {
            username:[],
            selectedUsername:null,
            userData:null,
        }
    }
    componentWillUpdate(nextProps, nextState){
        if(nextState.selectedUsername !== null && nextState.selectedUsername !== this.state.selectedUsername){
            this.getDataForUsername(nextState.selectedUsername)
        }
    }

    componentDidMount(){
        axios.get('/api/getAllUsername')
            .then( (response) =>{
                if(response.status === 200){
                    this.setState({
                        username: response.data
                    });
                }

            })
    }
    getDataForUsername(selectedUsername){

        axios.post('/api/getSelectedUserData',{username:selectedUsername})
            .then( (response) =>{
                if(response.status === 200){
                    this.setState({
                        userData: response.data
                    },()=>{
                        this.prepareData()
                    });

                }

            }).catch(()=>{
                this.setState({
                    userData: null
                })
            })
    }
    prepareData(){
        var weightGraphData = [];
        var userData = this.state.userData;
        userData.weight.forEach((value,index)=>{
            weightGraphData.push({date:value.date,weight:value.weight});
        })

        this.setState({
            weightGraphData:weightGraphData

        })
    }
    handelOnChange(value){
        this.setState({
            selectedUsername: value
        })
    }
    getSelectData(){
        var selectData = [];
        this.state.username.forEach((value)=>{
            var selectObject = {label: value, value:value}
            selectData.push(selectObject);
        })
        return selectData;
    }
    render(){
        return (
            <div className={"dc-content"}>
                <div className={"row"}>
                    <div className={"col-lg-6 col-md-6 col-sm-6 col-xs-12"}>
                        <FloatingLabelInput type={"select"} options={this.getSelectData()} labelName={"Username"} onChange={(e) => {e.preventDefault();this.handelOnChange(e.currentTarget.value)}} name={"state"} value={this.state.selectedUsername ? this.state.selectedUsername : ""}  />
                    </div>
                    {this.state.userData ?
                        <div style={{marginTop:"10px"}}>
                            <div className={"col-lg-12 col-md-12 col-sm-12 col-xs-12"}>
                                <UserDetails userDetails={this.state.userData}/>
                            </div>
                            <div className={"col-lg-12 col-md-12 col-sm-12 col-xs-12"}>
                                <AreaGraph
                                    data={this.state.weightGraphData}
                                />
                            </div>
                        </div>
                    : null}
                </div>
            </div>


        )
    }
}
