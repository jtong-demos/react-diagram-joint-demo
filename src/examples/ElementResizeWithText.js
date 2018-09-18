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
            },
            interactive: false
        });
        

        var CustomTextElement = joint.dia.Element.define('examples.CustomTextElement', {
            attrs: {
                label: {
                    textAnchor: 'middle',
                    textVerticalAnchor: 'middle',
                    fontSize: 48
                },
                
                c: {
                    strokeWidth: 1,
                    stroke: '#000000',
                    fill: 'rgba(0,0,255,0.3)'
                },
                outline: {
                    ref: 'label',
                    refX: 0,
                    refY: 0,
                    refWidth: '100%',
                    refHeight: '100%',
                    strokeWidth: 1,
                    stroke: '#000000',
                    strokeDasharray: '5 5',
                    strokeDashoffset: 2.5,
                    fill: 'none'
                }
            }
        }, {
                markup: [ {
                    tagName: 'circle',
                    selector: 'c'
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
                text: 'H'
            },
            c: {
                ref: 'label',
                refRCircumscribed: '50%',
                // c is already centered at label anchor
            }
        });
        element.position(300, 150);
        element.addTo(this.graph);

        this.change(element)
    }

    change(element){
        function type(element) {
            element.transition('attrs/label/text', 'Hello, World!', {
                delay: 1000,
                duration: 4000,
                valueFunction: function (start, end) {
                    return function (time) {
                        return start + end.substr(1, Math.ceil(end.length * time))
                    }
                }
            });

            element.typeToggle = false;
        }

        function untype(element) {
            element.transition('attrs/label/text', 'H', {
                delay: 1000,
                duration: 4000,
                timingFunction: function (time) {
                    return (1 - time);
                },
                valueFunction: function (start, end) {
                    return function (time) {
                        return end + start.substr(1, Math.ceil(start.length * time));
                    }
                }
            });

            element.typeToggle = true;
        }

        element.currentTransitions = 0;
        element.typeToggle = true;

        type(element);

        element.on('transition:start', function (element) {
            element.currentTransitions += 1;
        });

        element.on('transition:end', function (element) {
            element.currentTransitions -= 1;

            if (element.currentTransitions === 0) {
                if (element.typeToggle) type(element);
                else untype(element)
            }
        });
    }

    render() {
        return (
            <div ref="placeholder"></div>
        );
    }
}

export default GraphContainer;
