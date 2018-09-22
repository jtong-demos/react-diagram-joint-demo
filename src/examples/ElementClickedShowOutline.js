import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import joint from 'jointjs'

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
            height: 300,
            model: this.graph,
            gridSize: 8,
            drawGrid: true,
            background: {
                color: 'rgba(0, 255, 0, 0.3)'
            }
        });
        



        var CustomTextElement = joint.dia.Element.define('examples.CustomTextElement', {
            attrs: {
                label: {
                    textAnchor: 'middle',
                    textVerticalAnchor: 'middle',
                    fontSize: 32
                },

                r: {
                    ref: 'label',
                    strokeWidth: 1,
                    stroke: '#000000',
                    fill: 'rgba(0,255,0,0.3)'
                },
                outline: {
                    ref: 'r',
                    refX: "-5%",
                    refY: "-10%",
                    refWidth: '110%',
                    refHeight: '120%',
                    strokeWidth: 0,
                    stroke: '#000000',
                    strokeDasharray: '5 5',
                    strokeDashoffset: 2.5,
                    fill: 'none'
                }
            }
        }, {
                markup: [{
                    tagName: 'rect',
                    selector: 'r'
                }, {
                    tagName: 'text',
                    selector: 'label'
                }, {
                    tagName: 'rect',
                    selector: 'outline'
                }]
            });

        var element = new CustomTextElement();
        element.attr({
            label: {
                text: 'Two Rect'
            },
            r: {
                ref: 'label',
                refX: "-5%",
                refY: "-5%",
                refWidth: '110%',
                refHeight: '110%',
            }
        });
        element.translate(210, 200);
        element.addTo(this.graph);

        
        paper.on('element:pointerclick', function (elementView, event, x, y) {
            var currentElement = elementView.model;
            
            if(currentElement.attr("outline/strokeWidth")===0){
                currentElement.attr({
                    outline: {
                        strokeWidth: 1
                    }
                })
            }
            
        })

        paper.on('blank:pointerclick', function (event, x, y) {

            var elements = paper.model.getElements();
            elements.forEach(element => {
                if (element.attr("outline/strokeWidth") !== 0) {
                    element.attr({
                        outline: {
                            strokeWidth: 0
                        }
                    })
                }
            });

        })


    }



    render() {
        return (
            <div ref="placeholder"></div>
        );
    }
}

export default GraphContainer;
