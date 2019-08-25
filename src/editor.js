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


class EditorMode {
    constructor() {
    }

    Enter() {
    }

    Exit() {
    }

}


class Select_EditorMode extends EditorMode{
    constructor(canvas) {
        super()
        this.canvas = canvas

    }

    Enter() {
        console.log("EnterSelectMode()")
        // this.canvas.addEventListener('mouseover', SelectMode_Mouseover_Handler, false)
        // this.canvas.addEventListener('mousemove', SelectMode_Mousemove_Handler, false)
        // this.canvas.addEventListener('mousedown', SelectMode_Mousedown_Handler, false)
        // this.canvas.addEventListener('mouseup', SelectMode_Mouseup_Handler, false)        
        // this.canvas.addEventListener('mouseout', SelectMode_Mouseout_Handler, false)
    }

    Exit() {
        console.log("ExitSelectMode()")
        // this.canvas.removeEventListener('mouseover', SelectMode_Mouseover_Handler, false)
        // this.canvas.removeEventListener('mousemove', SelectMode_Mousemove_Handler, false)
        // this.canvas.removeEventListener('mousedown', SelectMode_Mousedown_Handler, false)
        // this.canvas.removeEventListener('mouseup', SelectMode_Mouseup_Handler, false)        
        // this.canvas.removeEventListener('mouseout', SelectMode_Mouseout_Handler, false)
    }

}


class AddNode_EditorMode extends EditorMode{
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



class AddEdge_EditorMode extends EditorMode{
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


// -----------------------------------------------------------------------


class Editor {
    constructor(canvas, design, diagram) {
        this.canvas = canvas
        this.design = design
        this.diagram = diagram
    }

    SetMode(mode) {
        this.nextMode = mode

        if (this.currentMode) {
            this.currentMode.Exit()
        }

        this.currentMode = this.nextMode;
        this.currentMode.Enter()
}

    SetMode_Select() {
        this.SetMode(new Select_EditorMode(this.canvas))
    }

    SetMode_AddNode() {
        this.SetMode(new AddNode_EditorMode(this.canvas))
    }

    SetMode_AddEdge() {
        this.SetMode(new AddEdge_EditorMode(this.canvas))
    }
}

// ---------------------------------------------------------------------------

var editor = new Editor(document.getElementById("diagram_canvas"), designModel, designView)


// ---------------------------------------------------------------------------

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
    var newNode = {id: id, label: id, x: mousePos.x, y: mousePos.y}
    designModel.AddNode(newNode)
    designView.SetData(designModel.GetNodes())
    designView.RedrawImage()

}


// ---------------------------------------------------------------------------


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

    // var mousePos = getMousePos(editor.canvas, ev)
    // console.log(mousePos.x + ' ' + mousePos.y + ' ' + ev.clientX + ' ' + ev.clientY)
    // var id = uuidv1()
    // var newNode = {id: id, label: id, x: mousePos.x, y: mousePos.y}
    // designModel.AddNode(newNode)
    // designView.SetData(designModel.GetNodes())
    // designView.RedrawImage()

    console.log("Mouse Up")
    console.log(" - Can we finish the drawing lines 'interaction' mode?")
}

// ---------------------------------------------------------------------------


export {
    Editor, 
    editor
    // Select_EditorMode,

}

