import { DesignModel, designModel } from './designmodel';

const uuidv1 = require('uuid/v1');
const d3 = require('d3');

// ---------------------------------------------------------------------------

class Editor {
    constructor(canvas, design) {
        this.canvas = canvas
        this.design = design

        this.data = [];
        this.width = 800;
        this.height = 800;

        this.svg = d3.select("#diagram_canvas")
                            .append("svg:svg")
                            .attr("width", this.width)
                            .attr("height", this.height);


    }

    SetData(data) {
        this.data = data
    }

    RedrawImage() {
        this.svg.selectAll("node")
            .data(this.data)
            .enter()
            .append("svg:circle")
            .attr("cx", function (d) { return d.x })
            .attr("cy", function (d) { return d.y })
            .attr("r", 50)
            .attr("class", "node")
            .attr("id", function (d) { return d.id })
            .attr("fill", "#FFF")
            .attr("stroke", "#333")
            .attr("stroke-width", "2")
            .on("click", function (d) { console.log(JSON.stringify(d)) });
    }

    SetMode(mode) {
        this.previousMode = this.currentMode
        this.nextMode = mode

        if (this.currentMode) {
            this.currentMode.Exit()
        }

        this.currentMode = this.nextMode;
        this.currentMode.Enter()
    }

    SetMode_Select() {
        this.SetMode(new Select_EditorMode(this.canvas, this.diagram))
    }

    SetMode_AddNode() {
        this.SetMode(new AddNode_EditorMode(this.canvas))
    }

    SetMode_AddEdge() {
        this.SetMode(new AddEdge_EditorMode(this.canvas))
    }
}

// ---------------------------------------------------------------------------

var editor = new Editor(document.getElementById("diagram_canvas"), designModel)

// -----------------------------------------------------------------------

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

// -----------------------------------------------------------------------

class EditorMode {
    constructor() {
    }

    Enter() {
    }

    Exit() {
    }
}

// -----------------------------------------------------------------------

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
        this.canvas.addEventListener('mousedown', SelectMode_Mousedown_Handler, false)
        this.canvas.addEventListener('mousemove', SelectMode_Mousemove_Handler, false)
        this.canvas.addEventListener('mouseout', SelectMode_Mouseout_Handler, false)
        this.canvas.addEventListener('mouseup', SelectMode_Mouseup_Handler, false)


        this.dragHandler = d3.drag().on("drag", function () {
            d3.select(this)
                .attr("x", d3.event.x)
                .attr("y", d3.event.y);
        });

        this.dragHandler(this.svg.selectAll("node"));

    }

    Exit() {
        console.log("ExitSelectMode()")
        this.canvas.removeEventListener('mousemove', SelectMode_Mousemove_Handler, false)
        this.canvas.removeEventListener('mousedown', SelectMode_Mousedown_Handler, false)
        this.canvas.removeEventListener('mouseup', SelectMode_Mouseup_Handler, false)
        this.canvas.removeEventListener('mouseout', SelectMode_Mouseout_Handler, false)
    }

    DrawFeedback() {
        this.svg.append("rect")
            .attr("x", this.x)
            .attr("y", this.y)
            .attr("width", this.w)
            .attr("height", this.h);
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
    // draw box
    editor.currentMode.DrawFeedback()
}


function SelectMode_Mouseout_Handler(ev) {
    console.log("Select_Mouseout_Handler()")
    editor.currentMode.mode = "cancelled"
    editor.currentMode.x = 0
    editor.currentMode.y = 0
    editor.currentMode.w = 0
    editor.currentMode.h = 0

    // stop drawing box
}

function SelectMode_Mouseup_Handler(ev) {
    console.log("Select_Mouseup_Handler()")
    this.mode = "release"
    editor.currentMode.w = getMousePos(editor.canvas, ev).x - this.x
    editor.currentMode.h = getMousePos(editor.canvas, ev).y - this.y

    // also stop drawing box
}

// -----------------------------------------------------------------------

class AddNode_EditorMode extends EditorMode {
    constructor(canvas) {
        super()
        this.canvas = canvas
    }

    Enter() {
        console.log("AddNode_EditorMode.Enter()")
        this.canvas.addEventListener('mouseover', AddNodeMode_Mouseover_Handler, false)
        this.canvas.addEventListener('mousemove', AddNodeMode_Mousemove_Handler, false)
        this.canvas.addEventListener('mousedown', AddNodeMode_Mousedown_Handler, false)
        this.canvas.addEventListener('mouseout', AddNodeMode_Mouseout_Handler, false)
        this.canvas.addEventListener('mouseup', AddNodeMode_Mouseup_Handler, false)
    }

    Exit() {
        console.log("AddNode_EditorMode.Exit()")
        this.canvas.removeEventListener('mouseover', AddNodeMode_Mouseover_Handler, false)
        this.canvas.removeEventListener('mousemove', AddNodeMode_Mousemove_Handler, false)
        this.canvas.removeEventListener('mousedown', AddNodeMode_Mousedown_Handler, false)
        this.canvas.removeEventListener('mouseout', AddNodeMode_Mouseout_Handler, false)
        this.canvas.removeEventListener('mouseup', AddNodeMode_Mouseup_Handler, false)
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

// -----------------------------------------------------------------------

class AddEdge_EditorMode extends EditorMode {
    constructor(canvas) {
        super()
        this.canvas = canvas
    }

    Enter() {
        console.log("AddEdge_EditorMode.Enter()")
        this.canvas.addEventListener('mouseover', AddEdgeMode_Mouseover_Handler, false)
        this.canvas.addEventListener('mousedown', AddEdgeMode_Mousedown_Handler, false)
        this.canvas.addEventListener('mousemove', AddEdgeMode_Mousemove_Handler, false)
        this.canvas.addEventListener('mouseout', AddEdgeMode_Mouseout_Handler, false)
        this.canvas.addEventListener('mouseup', AddEdgeMode_Mouseup_Handler, false)
    }

    Exit() {
        console.log("AddEdge_EditorMode.Exit()")
        this.canvas.removeEventListener('mouseover', AddEdgeMode_Mouseover_Handler, false)
        this.canvas.removeEventListener('mousedown', AddEdgeMode_Mousedown_Handler, false)
        this.canvas.removeEventListener('mousemove', AddEdgeMode_Mousemove_Handler, false)
        this.canvas.removeEventListener('mouseout', AddEdgeMode_Mouseout_Handler, false)
        this.canvas.removeEventListener('mouseup', AddEdgeMode_Mouseup_Handler, false)
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

    console.log("Mouse Down")
    console.log(" - Can we initiate a 'interaction' mode for drawing lines?")
}

function AddEdgeMode_Mouseout_Handler(ev) {
    console.log("AddEdgeMode_Mouseout_Handler()")
}

function AddEdgeMode_Mouseup_Handler(ev) {
    console.log("AddEdgeMode_Mouseup_Handler()")


    console.log("Mouse Up")
    console.log(" - Can we finish the drawing lines 'interaction' mode?")
}

// ---------------------------------------------------------------------------


export {
    Editor, editor
}

