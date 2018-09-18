import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import joint from 'jointjs'

console.log(joint)

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
        link.labels([{
            attrs: {
                text: {
                    text: 'Hello, World!'
                }
            }
        }]);
        link.addTo(this.graph);


        var rect3 = new joint.shapes.standard.Rectangle();
        rect3.position(100, 130);
        rect3.resize(100, 40);
        rect3.attr({
            body: {
                fill: 'blue',
                rx: 10,
                ry: 10,
                strokeWidth: 0
            },
            label: {
                text: 'Hello',
                fill: 'white',
                fontSize: 11,
                fontVariant: 'small-caps'
            }
        });
        rect3.addTo(this.graph);

        var rect4 = new joint.shapes.standard.Rectangle();
        rect4.position(400, 130);
        rect4.resize(100, 40);
        rect4.attr({
            body: {
                fill: 'blue',
                strokeWidth: 0
            },
            label: {
                text: 'Link!',
                fill: 'white',
                fontSize: 13
            }
        });
        rect4.addTo(this.graph);

        var link2 = new joint.shapes.standard.Link();
        link2.source(rect3);
        link2.target(rect4);
        link2.vertices([
            new joint.g.Point(250, 100),
            new joint.g.Point(350, 200)
        ]);
        link2.router('orthogonal');
        link2.connector('rounded');
        link2.attr({
            line: {
                stroke: 'gray',
                strokeWidth: 4,
                strokeDasharray: '4 2',
                sourceMarker: {
                    'y': -12
                },
                targetMarker: {
                    'y': -12
                }
            }
        });
        link2.addTo(this.graph);

        var link3 = new joint.shapes.standard.Link();
        link3.source(rect3);
        link3.target(rect4);
        link3.connector('jumpover', { size: 5 });
        link3.addTo(this.graph);

    }

    render() {

        return (
            <div ref="placeholder"></div>
        );
    }
}

export default GraphContainer;
