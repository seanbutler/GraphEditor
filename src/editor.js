import { DesignModel, designModel } from './designmodel';

const uuidv1 = require('uuid/v1');
var cytoscape = require('cytoscape');

// ---------------------------------------------------------------------------

class Editor {
    constructor(element) {
        this.canvas = element

        var ids = [uuidv1(),uuidv1(), uuidv1()]
        this.cy = cytoscape({

            container: this.canvas,

            style: cytoscape.stylesheet()
            .selector('node')
                .css({
                    'content': 'data(name)',
                    'text-valign': 'center',
                    'text-outline-width': 2,
                    'text-outline-color': '#777777',
                    'background-color': '#777777',
                    'color': '#fff',
                })

            .selector(':selected')
                .css({
                    'border-width': 3,
                    'border-color': '#333',                    
                })             
                
            .selector('edge')
                .css({
                    'content': 'data(name)',
                    'text-valign': 'center',
                    'text-outline-width': 2,
                    'text-outline-color': '#777777',
                    'background-color': '#777777',
                    'color': '#fff'
                })

            .selector(':selected')
                .css({
                    'border-width': 3,
                    'border-color': '#333',
                }),
            layout: {
                name: 'grid',
                rows: 1
            },

            wheelSensitivity: 0.333,

        });

        this.canvas.width = 800
        this.canvas.height = 800

        this.cy.boxSelectionEnabled(true)
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

        for(var n = 0; n < selectedElementsJSON.length; n++) {
            selectedElementsJSON[n].data.id = uuidv1()
        }
        this.cy.add(selectedElementsJSON)
    }

    JoinSelected() {
        var selectedElements = this.cy.$(':selected');

        var newEdges = []
        for(var n = 1; n< selectedElements.length; n++) {
            newEdges.push({
                group : 'edges',
                data: {
                    id: uuidv1(),
                    name: 'new edge',
                    source: selectedElements[n-1].data('id'),
                    target: selectedElements[n].data('id')
                }
            })
        }

        this.cy.add(newEdges)
    }    


}

// ---------------------------------------------------------------------------

var editor = new Editor(document.getElementById("diagram_canvas"), designModel)

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
