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
        var el = new joint.shapes.standard.Rectangle();
        el.position(0, 0);
        el.resize(100, 40);
        el.attr({
            body: {
                rx: 2,
                ry: 2,
                fill: '#2ecc71',
                stroke: '#27ae60',
                strokeWidth: 2
            },
            label: {
                fontSize: 10,
                fill: '#333333'
            }
        });

        var outline = el.clone();
        outline.translate(410, 100);
        outline.attr({
            body: {
                filter: {
                    name: 'outline',
                    args: {
                        color: 'red',
                        width: 1,
                        opacity: 1,
                        margin: 5
                    }
                }
            },
            label: {
                text: 'outline(\'red\',2,1,5)'
            }
        });
        outline.addTo(this.graph);


        var outline2 = el.clone();
        outline2.translate(210, 100);
        outline2.attr({
            body: {
                
                fill: {
                    type: 'lineGradient',
                    opacity: 1,

                },
                filter: {
                    name: 'outline',
                    args: {
                        color: 'red',
                        width: 1,
                        opacity: 1,
                        margin: 5
                    }
                }
            },
            label: {
                text: 'opacity rect \n must have 2 outline'
            }
        });
        outline2.addTo(this.graph);



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
                    strokeWidth: 1,
                    stroke: '#000000',
                    strokeDasharray: '5 5',
                    strokeDashoffset: 2.5,
                    fill: 'none'
                }
            }
        }, {
                markup: [ {
                    tagName: 'rect',
                    selector: 'r'
                },  {
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



        
    }

   

    render() {
        return (
            <div ref="placeholder"></div>
        );
    }
}

export default GraphContainer;
