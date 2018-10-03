import React,{Component} from "react";
import ReactFauxDOM from 'react-faux-dom';
import * as d3 from "d3";
export default class AreaGraph extends Component{
    constructor(props){
        super(props);
        this.state = {
            margin: {top: 20, right: 20, bottom: 30, left: 50},
            width:0,
            height: 0
        }
    }
    componentWillMount(){
        const {margin} = this.state;
        var width = +960- margin.left - margin.right;
        var height = +500 - margin.top - margin.bottom;

        this.setState({
            width: width,
            height: height
        })
    }
    createSvgNode() {
        const node = new ReactFauxDOM.Element('svg');
        node.setAttribute('width', "960");
        node.setAttribute('height', "500");
        return node;
    }
    createSvgRoot({ node, margin }) {
        return d3.select(node)
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);
    }
    prepareData(data){
        var parseTime = d3.timeParse("%d-%b-%y");
        var modifiedData = [];
        data.forEach((value)=>{
            var newObject = {};
            Object.keys(value).forEach((key)=>{
                if(key === "date"){
                    newObject[key] = parseTime(value[key]);
                }else if(key === "weight"){
                    newObject[key] = parseFloat(value[key])
                }
            })
            modifiedData.push(newObject);

        });
        return modifiedData;
    }
    render(){
        const {margin,height,width} = this.state;
        const {data} = this.props;
        const node = this.createSvgNode();
        var root = this.createSvgRoot({node, margin});


        var x = d3.scaleTime()
            .rangeRound([0, width]);

        var y = d3.scaleLinear()
            .rangeRound([height, 0]);

        var area = d3.area()
            .x(function(d) { return x(d.date); })
            .y1(function(d) { return y(d.weight); });

        if(data){
            var parsedData = this.prepareData(data);
            parsedData.forEach((value)=>{
                x.domain(d3.extent(parsedData, function(d) { return d.date; }));
                y.domain([0, d3.max(parsedData, function(d) { return d.weight; })]);
                area.y0(y(0));
                root.append("path")
                    .datum(parsedData)
                    .attr("fill", "steelblue")
                    .attr("d", area);
                root.append("g")
                    .attr("transform", "translate(0," + height + ")")
                    .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%d-%b-%Y")));

                root.append("g")
                    .call(d3.axisLeft(y))
                    .append("text")
                    .attr("fill", "#000")
                    .attr("transform", "rotate(-90)")
                    .attr("y", 6)
                    .attr("dy", "0.71em")
                    .attr("text-anchor", "end")
                    .text("Weight (KG)");
            })
        }
        return (
            <div className={"card-main"}>
                {node.toReact()}
            </div>
        )
    }
}
