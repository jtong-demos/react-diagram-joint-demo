import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import joint from 'jointjs'
import $ from 'jquery'

class GraphContainer extends Component {

    constructor(props) {
        super(props);
        this.graph = new joint.dia.Graph();
        this.cells = [];

    }

    componentDidMount() {
        const paper = new joint.dia.Paper({
            el: ReactDOM.findDOMNode(this.refs.placeholder),
            width: 600,
            height: 200,
            model: this.graph,
            gridSize: 8,
            drawGrid: true,
            background: {
                color: 'rgba(0, 255, 0, 0.3)'
            }
        });
        $("#dragAndDrop svg").on("drop", (event)=>{
            let rect = new joint.shapes.standard.Rectangle();
            console.log(event.clientX)
            console.log(event.clientY)
        
            rect.position(parseInt(event.clientX), parseInt(event.clientY));
            rect.resize(100, 40);
            rect.attr({
                body: {
                    fill: 'blue'
                },
                label: {
                    text: 'Hello',
                    fill: 'white'
                }
            });
            rect.addTo(this.graph);
        })
        var rect = new joint.shapes.standard.Rectangle();
        rect.position(100, 30);
        rect.resize(100, 40);
        rect.attr({
            body: {
                fill: 'blue'
            },
            label: {
                text: 'Hello',
                fill: 'white'
            }
        });
        rect.addTo(this.graph);

        var rect2 = rect.clone();
        rect2.translate(300, 0);
        rect2.attr('label/text', 'World!');
        rect2.addTo(this.graph);

        var link = new joint.shapes.standard.Link();
        link.source(rect);
        link.target(rect2);
        link.addTo(this.graph);

        paper.on('blank:pointerdblclick',  (event, x, y) =>{
            console.log(event)
            let rect = new joint.shapes.standard.Rectangle();
            rect.position(x, y);
            rect.resize(100, 40);
            rect.attr({
                body: {
                    fill: 'blue'
                },
                label: {
                    text: 'Hello',
                    fill: 'white'
                }
            });
            rect.addTo(this.graph);
        });
    }

    onDropHandler = (event) => {
        console.log(event)
        console.log(event.clentX)
    }

    render() {
        const rectStyle = {
            /* Make sure events are propagated to the JointJS element so, e.g. dragging works.*/
            pointerEvents: 'auto',
            background: 'none',
            WebkitUserSelect: 'none',
            borderRadius: "4px",
            border: "2px solid #2980B9",
            padding: "5px",
            display: "block",
            boxSizing: "border-box",
            width: "100px",
            height: "100px"
        };
        return (
            <div>
                <div id="dragAndDrop" ref="placeholder" onDragOver= {(event) => {
                    console.log("Hello")
                                    event.stopPropagation();
                event.preventDefault(); 
                return false;
                }}></div>
                <div style={rectStyle} draggable="true" >a</div>
                

            </div>
        );
    }
}

export default GraphContainer;
