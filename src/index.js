import { DesignModel, designModel } from './designmodel';   // MODEL
import { Editor, editor } from './editor';                  // PRESENTATION & INTERACTION

// ---------------------------------------------------------------------------

require('bootstrap')
require("jquery")

// ---------------------------------------------------------------------------

var selectButton = document.getElementById("select_button")
selectButton.addEventListener('click', function (ev){
    console.log("Event: Select Button Click")
    editor.SetMode_Select()
}, false)

var addNodeButton = document.getElementById("addnode_button")
addNodeButton.addEventListener('click', function (ev){
    console.log("Event: Add Node Button Click")
    editor.SetMode_AddNode()
}, false)

var addEdgeButton = document.getElementById("addedge_button")
addEdgeButton.addEventListener('click', function (ev){
    console.log("Event: Add Edge Button Click")
    editor.SetMode_AddEdge()
}, false)

// ---------------------------------------------------------------------------

var dumpButton = document.getElementById("dump_button")
dumpButton.addEventListener('click', function (ev){
    console.log("Event: Dump Button Click")
    console.log(designModel.Serialise())
}, false)

// ---------------------------------------------------------------------------

