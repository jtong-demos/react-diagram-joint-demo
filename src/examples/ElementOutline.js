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
    }

   

    render() {
        return (
            <div ref="placeholder"></div>
        );
    }
}

export default GraphContainer;
