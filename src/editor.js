import { DesignModel, designModel } from './designmodel';

const uuidv1 = require('uuid/v1');
var cytoscape = require('cytoscape');

// ---------------------------------------------------------------------------

class Editor {
    constructor(element, design) {
        this.canvas = element
        this.design = design

        var ids = [uuidv1(),uuidv1(), uuidv1()]
        this.cy = cytoscape({

            container: this.canvas,

            elements: [ // list of graph elements to start with
                { group: 'nodes', 
                    data: { id: ids[0], name: 'name1', weight: 50, faveColor: '#6FB1FC'}, 
                    position: { x: 100, y: 100 } },
                { group: 'nodes', 
                    data: { id: ids[1], name: 'name2', weight: 60, faveColor: '#EDA1ED'}, 
                    position: { x: 200, y: 200 } },
                { 
                    group: 'edges', 
                    data: { 
                        id: ids[2], 
                        name: 'name3', 
                        weight: 70, 
                        faveColor: '#6FB1FC', 
                        source: ids[0], 
                        target: ids[1] 
                    } 
                }
            ],

            style: cytoscape.stylesheet()
            .selector('node')
                .css({
                    'shape': 'ellipse',
                    'width': '50',
                    'height': '50',
                    'content': 'data(name)',
                    'text-valign': 'center',
                    'text-outline-width': 2,
                    'text-outline-color': '#FF7700',
                    'background-color': '#FF7700',
                    'color': '#fff'
                }),


            // style: [ // the stylesheet for the graph
            //     {
            //         selector: 'node',
            //         style: {
            //             'background-color': '#666',
            //             'label': 'data(id)',
            //             'shape': 'ellipse'
            //         }
            //     },

            //     {
            //         selector: 'edge',
            //         style: {
            //             'width': 3,
            //             'line-color': '#ccc',
            //             'target-arrow-color': '#ccc',
            //             'target-arrow-shape': 'triangle'
            //         }
            //     }
            // ],

            layout: {
                name: 'grid',
                rows: 1
            }

        });

        this.canvas.width = 1200
        this.canvas.height = 1200

        // this.cy.on('tap', function (event) {
        //     // target holds a reference to the originator
        //     // of the event (core or element)
        //     var evtTarget = event.target;

        //     if (evtTarget == this.cy) {
        //         console.log('tap on background');
        //     } else {
        //         console.log('tap on some element');
        //     }
        // })

        this.cy.boxSelectionEnabled(true)
    }

    AddNode() {
        this.cy.add({
            group: 'nodes',
            data: { name: 'new node' },
            position: { x: 200, y: 200 }
        });
    }

    RemoveSelected() {
        this.removedElements = this.cy.$(':selected').remove();
    }

    RestoreRemoved() {
        this.removedElements.restore();
    }

    CloneSelected() {
        var clonedElements = this.cy.$(':selected').clone();

        clonedElements.forEach(function(element){
            element.data.id = uuidv1()            
        })

        this.cy.add(clonedElements)
    }


    JoinPair() {
        var selectedElements = this.cy.$(':selected');

        if (selectedElemenets.length == 2)
        {
            var newEdges = []
            newEdges.push({
                group : 'edges',
                data: {
                    id: uuidv1(),
                    name: 'new edge',
                    source: selectedElements[0].data('id'),
                    target: selectedElements[1].data('id')
                }
            })

            this.cy.add(newEdges)
        }
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


    SetMode(mode) {
        // this.previousMode = this.currentMode
        // this.nextMode = mode

        // if (this.currentMode) {
        //     this.currentMode.Exit()
        // }

        // this.currentMode = this.nextMode;
        // this.currentMode.Enter()
    }

    SetMode_Select() {
        // this.SetMode(new Select_EditorMode(this.canvas))
    }

    SetMode_AddNode() {
        // this.SetMode(new AddNode_EditorMode(this.canvas))
    }

    SetMode_AddEdge() {
        // this.SetMode(new AddEdge_EditorMode(this.canvas))
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

// ---------------------------------------------------------------------------

class EditorMode {
    constructor() {
    }

    Enter() {
    }

    Exit() {
    }
}

// ---------------------------------------------------------------------------

class Select_EditorMode extends EditorMode {
    constructor(canvas, svg) {
        super()
        this.canvas = canvas
        this.svg = svg

        this.x = 0
        this.y = 0
        this.w = 0
        this.h = 0
    }

    Enter() {
        console.log("Select_EditorMode.Enter()")
        this.canvas.addEventListener('mousedown', Mousedown_Handler, false)
        this.canvas.addEventListener('mousemove', Mousemove_Handler, false)
        this.canvas.addEventListener('mouseout', Mouseout_Handler, false)
        this.canvas.addEventListener('mouseup', Mouseup_Handler, false)
    }

    Exit() {
        console.log("ExitSelectMode()")
        this.canvas.removeEventListener('mousemove', SelectMode_Mousemove_Handler, false)
        this.canvas.removeEventListener('mousedown', SelectMode_Mousedown_Handler, false)
        this.canvas.removeEventListener('mouseup', SelectMode_Mouseup_Handler, false)
        this.canvas.removeEventListener('mouseout', SelectMode_Mouseout_Handler, false)
    }
}

function SelectMode_Mousedown_Handler(ev) {
    console.log("Select_Mousedown_Handler()")
    console.log(" -- start drawing a box at the mouse position")
    editor.currentMode.x = getMousePos(editor.canvas, ev).x
    editor.currentMode.y = getMousePos(editor.canvas, ev).y
    editor.currentMode.mode = "down"
}

function SelectMode_Mousemove_Handler(ev) {
    console.log("Select_Mousemove_Handler()")
    editor.currentMode.mode = "dragging"
    editor.currentMode.w = getMousePos(editor.canvas, ev).x - editor.currentMode.x
    editor.currentMode.h = getMousePos(editor.canvas, ev).y - editor.currentMode.y
    editor.currentMode.DrawFeedback()
}

function SelectMode_Mouseout_Handler(ev) {
    console.log("Select_Mouseout_Handler()")
    editor.currentMode.mode = "cancelled"
    editor.currentMode.x = 0
    editor.currentMode.y = 0
    editor.currentMode.w = 0
    editor.currentMode.h = 0
}

function SelectMode_Mouseup_Handler(ev) {
    console.log("Select_Mouseup_Handler()")
    this.mode = "release"
    editor.currentMode.w = getMousePos(editor.canvas, ev).x - this.x
    editor.currentMode.h = getMousePos(editor.canvas, ev).y - this.y
}

// ---------------------------------------------------------------------------

class AddNode_EditorMode extends EditorMode {
    constructor(canvas) {
        super()
        this.canvas = canvas
    }

    Enter() {
        console.log("AddNode_EditorMode.Enter()")
        // this.canvas.addEventListener('mouseover', AddNodeMode_Mouseover_Handler, false)
        // this.canvas.addEventListener('mousemove', AddNodeMode_Mousemove_Handler, false)
        // this.canvas.addEventListener('mousedown', AddNodeMode_Mousedown_Handler, false)
        // this.canvas.addEventListener('mouseout', AddNodeMode_Mouseout_Handler, false)
        // this.canvas.addEventListener('mouseup', AddNodeMode_Mouseup_Handler, false)
    }

    Exit() {
        console.log("AddNode_EditorMode.Exit()")
        // this.canvas.removeEventListener('mouseover', AddNodeMode_Mouseover_Handler, false)
        // this.canvas.removeEventListener('mousemove', AddNodeMode_Mousemove_Handler, false)
        // this.canvas.removeEventListener('mousedown', AddNodeMode_Mousedown_Handler, false)
        // this.canvas.removeEventListener('mouseout', AddNodeMode_Mouseout_Handler, false)
        // this.canvas.removeEventListener('mouseup', AddNodeMode_Mouseup_Handler, false)
    }
}

function AddNodeMode_Mouseover_Handler(ev) {
    console.log("AddNodeMode_Mouseover_Handler()")
}

function AddNodeMode_Mousemove_Handler(ev) {
    console.log("AddNodeMode_Mousemove_Handler()")
}

function AddNodeMode_Mousedown_Handler(ev) {
    console.log("AddNodeMode_Mousedown_Handler()")
}

function AddNodeMode_Mouseout_Handler(ev) {
    console.log("AddNodeMode_Mouseout_Handler()")
}

function AddNodeMode_Mouseup_Handler(ev) {
    console.log("AddNodeMode_Mouseup_Handler()")

    var mousePos = getMousePos(editor.canvas, ev)
    console.log(mousePos.x + ' ' + mousePos.y + ' ' + ev.clientX + ' ' + ev.clientY)
    var id = uuidv1()
    var newNode = { id: id, label: id, x: mousePos.x, y: mousePos.y }
    designModel.AddNode(newNode)

    editor.SetData(designModel.GetNodes())
    editor.RedrawImage()

}

// ---------------------------------------------------------------------------

class AddEdge_EditorMode extends EditorMode {
    constructor(canvas) {
        super()
        this.canvas = canvas
    }

    Enter() {
        console.log("AddEdge_EditorMode.Enter()")
        // this.canvas.addEventListener('mouseover', AddEdgeMode_Mouseover_Handler, false)
        // this.canvas.addEventListener('mousedown', AddEdgeMode_Mousedown_Handler, false)
        // this.canvas.addEventListener('mousemove', AddEdgeMode_Mousemove_Handler, false)
        // this.canvas.addEventListener('mouseout', AddEdgeMode_Mouseout_Handler, false)
        // this.canvas.addEventListener('mouseup', AddEdgeMode_Mouseup_Handler, false)
    }

    Exit() {
        console.log("AddEdge_EditorMode.Exit()")
        // this.canvas.removeEventListener('mouseover', AddEdgeMode_Mouseover_Handler, false)
        // this.canvas.removeEventListener('mousedown', AddEdgeMode_Mousedown_Handler, false)
        // this.canvas.removeEventListener('mousemove', AddEdgeMode_Mousemove_Handler, false)
        // this.canvas.removeEventListener('mouseout', AddEdgeMode_Mouseout_Handler, false)
        // this.canvas.removeEventListener('mouseup', AddEdgeMode_Mouseup_Handler, false)
    }
}

function AddEdgeMode_Mouseover_Handler(ev) {
    console.log("AddEdgeMode_Mouseover_Handler()")
}

function AddEdgeMode_Mousemove_Handler(ev) {
    console.log("AddEdgeMode_Mousemove_Handler()")
}

function AddEdgeMode_Mousedown_Handler(ev) {
    console.log("AddEdgeMode_Mousedown_Handler()")
    console.log("Mouse Down - Can we initiate a 'interaction' mode for drawing lines?")
}

function AddEdgeMode_Mouseout_Handler(ev) {
    console.log("AddEdgeMode_Mouseout_Handler()")
}

function AddEdgeMode_Mouseup_Handler(ev) {
    console.log("AddEdgeMode_Mouseup_Handler()")
    console.log("Mouse Up - Can we finish the drawing lines 'interaction' mode?")
}

// ---------------------------------------------------------------------------

export {
    Editor, editor
}
