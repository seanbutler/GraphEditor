import { DesignModel, designModel } from './designmodel';
import { DesignView, designView } from './designview';
const uuidv1 = require('uuid/v1');

// -----------------------------------------------------------------------

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

// -----------------------------------------------------------------------
 
class Editor {
    constructor(canvas, design, diagram) {
        this.canvas = canvas
        this.design = design
        this.diagram = diagram
    }

    EnterSelectMode() {
        console.log("EnterSelectMode()")
        // this.canvas.addEventListener('click', SelectModeClickHandler, false)
        this.canvas.addEventListener('mouseover', SelectMode_Mouseover_Handler, false)
        this.canvas.addEventListener('mousedown', SelectMode_Mousedown_Handler, false)
        this.canvas.addEventListener('mouseout', SelectMode_Mouseout_Handler, false)
        this.canvas.addEventListener('mouseup', SelectMode_Mouseup_Handler, false)        
    }

    ExitSelectMode() {
        console.log("ExitSelectMode()")
        // this.canvas.removeEventListener('click', SelectModeClickHandler, false)
        this.canvas.removeEventListener('mouseover', SelectMode_Mouseover_Handler, false)
        this.canvas.removeEventListener('mousedown', SelectMode_Mousedown_Handler, false)
        this.canvas.removeEventListener('mouseout', SelectMode_Mouseout_Handler, false)
        this.canvas.removeEventListener('mouseup', SelectMode_Mouseup_Handler, false)
    }

    EnterAddNodeMode() {
        console.log("EnterAddNodeMode()")
        // this.canvas.addEventListener('click', AddNodeMode_ClickHandler, false)
        this.canvas.addEventListener('mouseover', AddNodeMode_Mouseover_Handler, false)
        this.canvas.addEventListener('mousedown', AddNodeMode_Mousedown_Handler, false)
        this.canvas.addEventListener('mouseout', AddNodeMode_Mouseout_Handler, false)
        this.canvas.addEventListener('mouseup', AddNodeMode_Mouseup_Handler, false)        
    }

    ExitAddNodeMode() {
        console.log("ExitAddNodeMode()")
        this.canvas.removeEventListener('click', AddNodeModeClickHandler, false)
    }

    EnterAddEdgeMode() {
        console.log("EnterAddEdgeMode()")
        // this.canvas.addEventListener('mouseover', AddEdgeMode_Mousedown_Handler, false)
        // this.canvas.addEventListener('mousedown', AddEdgeMode_Mousedown_Handler, false)
        // this.canvas.addEventListener('mouseout', AddEdgeMode_Mouseup_Handler, false)
        // this.canvas.addEventListener('mouseup', AddEdgeMode_Mouseup_Handler, false)
    }

    ExitAddEdgeMode() {
        console.log("ExitAddEdgeMode()")
        // this.canvas.addEventListener('mouseover', AddEdgeMode_Mousedown_Handler, false)
        // this.canvas.addEventListener('mousedown', AddEdgeMode_Mousedown_Handler, false)
        // this.canvas.addEventListener('mouseout', AddEdgeMode_Mouseup_Handler, false)
        // this.canvas.addEventListener('mouseup', AddEdgeMode_Mouseup_Handler, false)
    }
}

// ---------------------------------------------------------------------------

var editor = new Editor(document.getElementById("diagram_canvas"), designModel, designView)

function SelectModeClickHandler(ev) {
    console.log("SelectModeClickHandler()")
    var mousePos = getMousePos(editor.canvas, ev)
    console.log(mousePos.x + ' ' + mousePos.y + ' ' + ev.clientX + ' ' + ev.clientY)
}

// ---------------------------------------------------------------------------

function SelectMode_Mouseover_Handler() {
    console.log("SelectMode_Mouseover_Handler()")
}

function SelectMode_Mousedown_Handler() {
    console.log("SelectMode_Mousedown_Handler()")

}

function SelectMode_Mouseout_Handler() {
    console.log("SelectMode_Mouseout_Handler()")

}

function SelectMode_Mouseup_Handler() {
    console.log("SelectMode_Mouseup_Handler()")
}

// ---------------------------------------------------------------------------

function AddNodeMode_Mouseover_Handler() {
    console.log("AddNodeMode_Mouseover_Handler()")
}

function AddNodeMode_Mousedown_Handler() {
    console.log("AddNodeMode_Mousedown_Handler()")
}

function AddNodeMode_Mouseout_Handler() {
    console.log("AddNodeMode_Mouseout_Handler()")
}

function AddNodeMode_Mouseup_Handler() {
    console.log("AddNodeMode_Mouseup_Handler()")
}

// ---------------------------------------------------------------------------

function AddNodeModeClickHandler(ev) {
    console.log("AddNodeModeClickHandler()")
    var mousePos = getMousePos(editor.canvas, ev)
    console.log(mousePos.x + ' ' + mousePos.y + ' ' + ev.clientX + ' ' + ev.clientY)
    var id = uuidv1()
    var newNode = {id: id, label: id, x: mousePos.x, y: mousePos.y}
    designModel.AddNode(newNode)
    designView.SetData(designModel.GetNodes())
    designView.RedrawImage()
}

function AddEdgeModeClickHandler(ev) {
    console.log("AddEdgeModeClickHandler()")
    var mousePos = getMousePos(editor.canvas, ev)
    console.log(mousePos.x + ' ' + mousePos.y + ' ' + ev.clientX + ' ' + ev.clientY)
    var id = uuidv1()
    var newNode = {id: id, label: id, x: mousePos.x, y: mousePos.y}
    designModel.AddNode(newNode)
    designView.SetData(designModel.GetNodes())
    designView.RedrawImage()
}

// ---------------------------------------------------------------------------

export {
    Editor, editor
}

