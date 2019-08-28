import { DesignModel, designModel } from './designmodel';   // MODEL
import { Editor, editor } from './editor';                  // PRESENTATION & INTERACTION

// ---------------------------------------------------------------------------

require('bootstrap')
require("jquery")

// ---------------------------------------------------------------------------


var selectButton = document.getElementById("select_button")
selectButton.addEventListener('click', function (ev){
    console.log("Event: Select Button Click")
}, false)

var editButton = document.getElementById("edit_button")
editButton.addEventListener('click', function (ev){
    console.log("Event: Edit Button Click")
}, false)

var addNodeButton = document.getElementById("addnode_button")
addNodeButton.addEventListener('click', function (ev){
    console.log("Event: Add Node Button Click")
    editor.AddNode()
}, false)

var addEdgeButton = document.getElementById("addedge_button")
addEdgeButton.addEventListener('click', function (ev){
    console.log("Event: Add Edge Button Click")
    editor.JoinSelected()
}, false)

var removeButton = document.getElementById("remove_button")
removeButton.addEventListener('click', function (ev){
    console.log("Event: Remove Button Click")
    editor.RemoveSelected()
}, false)

var restoreButton = document.getElementById("restore_button")
restoreButton.addEventListener('click', function (ev){
    console.log("Event: Restore Button Click")
    editor.RestoreRemoved()
}, false)

var cloneButton = document.getElementById("clone_button")
cloneButton.addEventListener('click', function (ev){
    console.log("Event: Clone Button Click")
    editor.CloneSelected()
}, false)

var fitButton = document.getElementById("clone_button")
fitButton.addEventListener('click', function (ev){
    console.log("Event: Fit Button Click")
    editor.CloneSelected()
}, false)

// ---------------------------------------------------------------------------

var dumpButton = document.getElementById("dump_button")
dumpButton.addEventListener('click', function (ev){
    console.log("Event: Dump Button Click")
    console.log(designModel.Serialise())
}, false)

// ---------------------------------------------------------------------------

