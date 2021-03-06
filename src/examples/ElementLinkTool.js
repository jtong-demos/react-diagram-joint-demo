import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import joint from 'jointjs'

class GraphContainer extends Component {Group

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


        let segmentsTool = new joint.linkTools.Segments();
        let boundaryTool = new joint.linkTools.Boundary();
        let removeButton = new joint.linkTools.Remove();
        var targetAnchorTool = new joint.linkTools.TargetAnchor();
        var targetArrowheadTool = new joint.linkTools.TargetArrowhead();

        let toolsView = new joint.dia.ToolsView({
            tools: [
                segmentsTool,
                boundaryTool,
                targetArrowheadTool,
                targetAnchorTool,
                removeButton
            ]
        });

        let linkView = link.findView(paper);
        linkView.addTools(toolsView);
        linkView.hideTools();


        paper.on('link:pointerclick', function (linkView, event, x, y) {
            linkView.showTools();
        });

        paper.on('blank:pointerclick', function (event, x, y) {
            linkView.hideTools();

        })
    }

    render() {

        return (
            <div ref="placeholder"></div>
        );
    }
}

export default GraphContainer;
