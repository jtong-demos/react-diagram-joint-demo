import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import joint from 'jointjs'
import _ from 'lodash'
import $ from 'jquery'

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
            height: 300,
            model: this.graph,
            gridSize: 8,
            drawGrid: true,
            background: {
                color: 'rgba(0, 255, 0, 0.3)'
            }
        });
        joint.shapes.html = {};
        joint.shapes.html.Element = joint.shapes.basic.Generic.extend({
            markup: '<rect/>',
            defaults: _.defaultsDeep({
                type: 'html.Element',
                attrs: {
                    rect: {
                        'ref-width': '100%',
                        'ref-height': '100%',
                        'stroke': 'gray'
                    }
                }
            }, joint.shapes.basic.Generic.prototype.defaults)
        });

        // Create a custom view for that element that displays an HTML div above it.
        // -------------------------------------------------------------------------

        joint.shapes.html.ElementView = joint.dia.ElementView.extend({

            template: [
                '<div class="my-html-element">',
                '<button class="linkB">+</button>',
                '<label data-attribute="mylabel"></label>',
                '</div>'
            ].join(''),

            init: function () {

                // Update the box position whenever the underlying model changes.
                this.listenTo(this.model, 'change', this.updateBox);
                
            },

            onBoxChange: function (evt) {

            },

            onRender: function() {

                if (this.$box) this.$box.remove();

                var boxMarkup = joint.util.template(this.template)();
                var $box = this.$box = $(boxMarkup);

                this.$attributes = $box.find('[data-attribute]');

                // React on all box changes. e.g. input change
                $box.on('change', _.bind(this.onBoxChange, this));

                console.log(this)
                this.$box.find('.linkB').on('mousedown', (event) =>{
                    this.linkBox(event)
                });

                // Update the box size and position whenever the paper transformation changes.
                // Note: there is no paper yet on `init` method.
                this.listenTo(this.paper, 'scale', this.updateBox);

                $box.appendTo(this.paper.el);
                this.updateBox();

                return this;
            },

            updateBox: function () {

                // Set the position and the size of the box so that it covers the JointJS element
                // (taking the paper transformations into account).
                var bbox = this.getBBox({ useModelGeometry: true });
                var scale = joint.V(this.paper.viewport).scale();

                this.$box.css({
                    transform: 'scale(' + scale.sx + ',' + scale.sy + ')',
                    transformOrigin: '0 0',
                    width: bbox.width / scale.sx,
                    height: bbox.height / scale.sy,
                    left: bbox.x,
                    top: bbox.y
                });

                this.updateAttributes();
            },

            updateAttributes: function () {

                var model = this.model;

                this.$attributes.each(function () {

                    var value = model.get(this.dataset.attribute);

                    switch (this.tagName.toUpperCase()) {
                        case 'LABEL':
                            this.textContent = value;
                            break;

                    }
                });
            },

            linkBox: function (event) {
                // console.log(event)
                event.currentTarget.blur()
                // console.log(this)
                var bbox = this.getBBox({ useModelGeometry: true });
                // console.log(bbox)
                var l = new joint.shapes.standard.Link()
                l.source(this.model)
                l.target(new joint.g.Point(event.originalEvent.x, event.originalEvent.y +20 -65 ))
                l.addTo(this.model.graph)
                l.toFront()
                

                // var link = new joint.shapes.standard.Link();
                // link.source(rect);
                // link.target(rect2);
                // link.addTo(this.graph);
            },

            onRemove: function () {

                this.$box.remove();
            }

            

        });

        // Create JointJS elements and add them to the graph as usual.
        // -----------------------------------------------------------

        var el1 = new joint.shapes.html.Element({
            position: { x: 80, y: 80 },
            size: { width: 150, height: 80 },
            myinput: 'I am an input',
            mylabel: 'I am a label'
        });

        var el2 = new joint.shapes.html.Element({
            position: { x: 350, y: 150 },
            size: { width: 150, height: 80 },
            myinput: 'I am HTML input',
            mylabel: 'I am HTML label'
        });

        var l = new joint.dia.Link({
            source: { id: el1.id },
            target: { id: el2.id }
        });

        this.graph.addCells([el1, el2, l]);

        paper.on('cell:pointerdown', function (cellView, evt, x, y) {
            // var cell = cellView.model;
            // var cellViewsBelow = paper.findViewsFromPoint(cell.getBBox().center());
            console.log(cellView)
            // console.log(cellViewsBelow)
            

        })
    }

    render() {

        return (
            <div>
                
                <div ref="placeholder"></div>
                <button > + </button>
            </div>
        );
    }
}

export default GraphContainer;
