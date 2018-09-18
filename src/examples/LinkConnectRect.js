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


        var CustomLink = joint.dia.Link.define('examples.CustomLink', {
            attrs: {
                line: {
                    connection: true,
                    fill: 'none',
                    stroke: '#333333',
                    strokeWidth: 2,
                    strokeLinejoin: 'round',
                    targetMarker: {
                        'type': 'path',
                        'd': 'M 10 -5 0 0 10 5 z'
                    }
                },
                offsetLabelPositive: {
                    textAnchor: 'middle',
                    textVerticalAnchor: 'middle',
                    fill: 'black',
                    fontSize: 12
                },
                offsetLabelPositiveBody: {
                    width: 120,
                    height: 20,
                    fill: 'white',
                    stroke: 'black'
                },
                offsetLabelMarker: {
                    atConnectionRatio: 0.66,
                    textAnchor: 'middle',
                    textVerticalAnchor: 'middle',
                    text: '●',
                    fill: 'black',
                    stroke: 'black',
                    strokeWidth: 1.2,
                    fontSize: 12,
                    fontWeight: 'bold'
                },
                offsetLabelPositiveConnector: {
                    atConnectionRatio: 0.66,
                    d: 'M 0 0 0 40',
                    stroke: 'black',
                    strokeDasharray: '5 5'
                }
            }
        }, {
                markup: [{
                    tagName: 'path',
                    selector: 'line'
                }, {
                    tagName: 'path',
                    selector: 'offsetLabelPositiveConnector'
                }, {
                    tagName: 'text',
                    selector: 'offsetLabelMarker'
                },
                {
                    tagName: 'rect',
                    selector: 'offsetLabelPositiveBody'
                }, {
                    tagName: 'text',
                    selector: 'offsetLabelPositive'
                }]
            });
            // markup决定显示层级，也就是图层谁盖住谁
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

        var link = new CustomLink();
        link.source(rect);
        link.target(rect2);
        link.attr({
            absoluteReverseLabel: {
                atConnectionLength: -100,
                text: '-100'
            },
            absoluteReverseLabelBody: {
                atConnectionLength: -100
            },
            offsetLabelPositive: {
                atConnectionRatio: 0.66,
                y: 40,
                text: 'keepGradient: 0,40'
            },
            offsetLabelPositiveBody: {
                atConnectionRatio: 0.66,
                x: -60, // 0 + -60
                y: 30 // 40 + -10
            }
        });
        link.addTo(this.graph);


        var link2 = new CustomLink();
        link2.source(new joint.g.Point(100, 110));
        link2.target(new joint.g.Point(500, 110))
        link2.attr({
            absoluteReverseLabel: {
                atConnectionLength: -100,
                text: '-100'
            },
            absoluteReverseLabelBody: {
                atConnectionLength: -100
            },
            offsetLabelPositive: {
                atConnectionRatio: 0.66,
                y: 40,
                text: 'keepGradient: 0,40'
            },
            offsetLabelPositiveBody: {
                atConnectionRatio: 0.66,
                x: -60, // 0 + -60
                y: 30 // 40 + -10
            }
        });
        link2.addTo(this.graph);


    }

    render() {
        return (
            <div ref="placeholder"></div>
        );
    }
}

export default GraphContainer;
