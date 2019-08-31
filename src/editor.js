import Textview_Component from './components.js'

const uuidv1 = require('uuid/v1')
var cytoscape = require('cytoscape')

// ---------------------------------------------------------------------------



// ---------------------------------------------------------------------------


class Editor {
    constructor(element, toggleNodeInfoDialogFunc) {
        this.canvas = element
        this.layout = {}
        var ids = [uuidv1(), uuidv1(), uuidv1()]
        this.cy = cytoscape({

            container: this.canvas,
            style: [
                {
                    selector: 'node',
                    style: {
                        'content': 'data(name)'
                    }
                },
                {
                    selector: 'edge',
                    style: {
                        'content': 'data(name)',
                        'curve-style': 'bezier',
                    }
                }
            ],
            layout: {
                name: 'random',
                // rows: 1
            },

            wheelSensitivity: 0.25,

        });

        this.canvas.width = 800
        this.canvas.height = 800

        this.cy.boxSelectionEnabled(true)

        // this.cy.on('tap', function (event) {
        //     HandleBackgroundEvent(event, this)
        // });

        // this.cy.on('tap', 'node', function (evt) {
        //     var target = evt.target;
        //     console.log('node tapped ' + target.id());
        //     document.getElementById('nodeInfoCard').style.display = 'block'
        // });

        this.cy.on('tap', 'edge', function (evt) {
            var target = evt.target;
            console.log('edge tapped ' + target.id());
            document.getElementById('edgeInfoCard').style.display = 'block'
        });
    }


    HandleBackgroundEvent(event) {
        var evtTarget = event.target;
    
        if (evtTarget === this.cy) {
            console.log('tap on background');
            document.getElementById('edgeInfoCard').style.display = 'none'
            document.getElementById('nodeInfoCard').style.display = 'none'
        }
    }

    AddNode() {
        this.cy.add({
            group: 'nodes',
            data: { name: 'new node' },
            // position: { x: 200, y: 200 }
        });

        this.cy.fit()
    }

    RemoveSelected() {
        this.removedElements = this.cy.$(':selected').remove();
    }

    RestoreRemoved() {
        this.removedElements.restore();
    }

    CloneSelected() {
        var selection = this.cy.elements(':selected')
        var selectedElementsJSON = this.cy.json(selection).elements
        // console.log(selectedElementsJSON)

        for (var n = 0; n < selectedElementsJSON.length; n++) {
            selectedElementsJSON[n].data.id = uuidv1()
        }
        this.cy.add(selectedElementsJSON)
    }

    JoinSelected() {
        var selectedElements = this.cy.$(':selected');

        var newEdges = []
        for (var n = 1; n < selectedElements.length; n++) {
            newEdges.push({
                group: 'edges',
                data: {
                    id: uuidv1(),
                    name: 'new edge',
                    source: selectedElements[n - 1].data('id'),
                    target: selectedElements[n].data('id')
                }
            })
        }
        this.cy.add(newEdges)
    }

    SetLayout(options) {
        this.layout = this.cy.elements().layout(options);
    }

    ApplyLayout(options) {
        this.layout.run();
    }

    ShowTextViewComponent(doc, context) {
        this.textviewComponent = new Textview_Component(doc, context)
    }
}

// ---------------------------------------------------------------------------

var editor = new Editor(document.getElementById("diagram_canvas"))

// ---------------------------------------------------------------------------

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function jsonCopy(src) {
    return JSON.parse(JSON.stringify(src));
}

function bestCopyEver(src) {
    return Object.assign({}, src);
}

// ---------------------------------------------------------------------------


export {
    Editor, editor
}
