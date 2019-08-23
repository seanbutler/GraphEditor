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
        this.canvas.addEventListener('click', SelectModeClickHandler, false)
    }

    ExitSelectMode() {
        console.log("ExitSelectMode()")
        this.canvas.removeEventListener('click', SelectModeClickHandler, false)
    }

    EnterAddNodeMode() {
        console.log("EnterAddNodeMode()")
        this.canvas.addEventListener('click', AddNodeModeClickHandler, false)
    }

    ExitAddNodeMode() {
        console.log("ExitAddNodeMode()")
        this.canvas.removeEventListener('click', AddNodeModeClickHandler, false)
    }
}

// ---------------------------------------------------------------------------

var editor = new Editor(document.getElementById("diagram_canvas"), designModel, designView)

function SelectModeClickHandler(ev) {
    console.log("SelectModeClickHandler()")
    var mousePos = getMousePos(editor.canvas, ev)
    console.log(mousePos.x + ' ' + mousePos.y + ' ' + ev.clientX + ' ' + ev.clientY)
}

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

// ---------------------------------------------------------------------------

export {
    Editor, editor
}

