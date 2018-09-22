import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import joint from 'jointjs'
import _ from 'lodash'

class GraphContainer extends Component {
    Group

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
        var r1 = new joint.shapes.basic.Rect({
            position: { x: 20, y: 20 },
            size: { width: 200, height: 200 },
            attrs: {
                rect: {
                    isContainer: true,
                    fill: 'none', strokeWidth: 2,
                    stroke: '#000000',
                    strokeDasharray: '5 5',
                    strokeDashoffset: 2.5, }, text: { text: 'Container' } }
        });
        var r2 = new joint.shapes.basic.Rect({
            position: { x: 270, y: 30 },
            size: { width: 100, height: 80 },
            attrs: { rect: { fill: '#F1C40F' }, text: { text: 'Element' } }
        });
        var r3 = new joint.shapes.basic.Rect({
            position: { x: 370, y: 30 },
            size: { width: 100, height: 80 },
            attrs: { rect: { fill: '#F1C40F' }, text: { text: 'Element' } }
        });

        this.graph.addCells([r1, r2,r3]);

        // First, unembed the cell that has just been grabbed by the user.
        paper.on('cell:pointerdown', (cellView, evt, x, y)  => {

            var cell = cellView.model;
            

            if (!cell.get('embeds') || cell.get('embeds').length === 0) {
                // Show the dragged element above all the other cells (except when the
                // element is a parent).
                cell.toFront();
            }

            if (cell.get('parent')) {
                this.graph.getCell(cell.get('parent')).unembed(cell);
            }
        });

        // When the dragged cell is dropped over another cell, let it become a child of the
        // element below.
        paper.on('cell:pointerup', function (cellView, evt, x, y) {

            var cell = cellView.model;
            var cellViewsBelow = paper.findViewsFromPoint(cell.getBBox().center());
            console.log(cellViewsBelow)
            if(cell.attr("rect/isContainer")){
                
            }else{
                if (cellViewsBelow.length) {
                    // Note that the findViewsFromPoint() returns the view for the `cell` itself.
                    var cellViewBelow = _.find(cellViewsBelow, function (c) { return c.model.id !== cell.id });

                    // Prevent recursive embedding.
                    if (cellViewBelow && cellViewBelow.model.get('parent') !== cell.id) {
                        cellViewBelow.model.embed(cell);
                    }
                }
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
