import { download } from './utils';
import { Editor, editor } from './editor';                  // PRESENTATION & INTERACTION
var FileSaver = require('file-saver');

;
// ---------------------------------------------------------------------------


require('bootstrap')
require("jquery")

// ---------------------------------------------------------------------------

//
// Action Buttons and Menu Items
//

var addNodeButton = document.getElementById("addnode_button")
addNodeButton.addEventListener('click', function (ev) {
    console.log("Event: Add Node Button Click")
    editor.AddNode()
}, false)

var addEdgeButton = document.getElementById("addedge_button")
addEdgeButton.addEventListener('click', function (ev) {
    console.log("Event: Add Edge Button Click")
    editor.JoinSelected()
}, false)

var removeButton = document.getElementById("remove_button")
removeButton.addEventListener('click', function (ev) {
    console.log("Event: Remove Button Click")
    editor.RemoveSelected()
}, false)

var restoreButton = document.getElementById("restore_button")
restoreButton.addEventListener('click', function (ev) {
    console.log("Event: Restore Button Click")
    editor.RestoreRemoved()
}, false)

var cloneButton = document.getElementById("clone_button")
cloneButton.addEventListener('click', function (ev) {
    console.log("Event: Clone Button Click")
    editor.CloneSelected()
}, false)

var fitButton = document.getElementById("clone_button")
fitButton.addEventListener('click', function (ev) {
    console.log("Event: Fit Button Click")
    editor.CloneSelected()
}, false)

// ---------------------------------------------------------------------------

var dumpButton = document.getElementById("dump_button")
dumpButton.addEventListener('click', function (ev) {
    console.log("Event: Dump Button Click")
}, false)

// ---------------------------------------------------------------------------

var randomLayoutMenuItem = document.getElementById("randomlayout_menuitem")
randomLayoutMenuItem.addEventListener('click', function (ev) {
    console.log("Event: Random Layout Menu Item Click")

    let options = {
        name: 'random',
        fit: true,                  // whether to fit to viewport
        padding: 30,                // fit viewport padding
        boundingBox: undefined,     // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
        animate: true,              // whether to transition the node positions
        animationDuration: 1000,    // duration of animation in ms if enabled
        animationEasing: undefined, // easing of animation if enabled
    };

    editor.SetLayout(options)
    editor.ApplyLayout()
}, false)


var gridLayoutMenuItem = document.getElementById("gridlayout_menuitem")
gridLayoutMenuItem.addEventListener('click', function (ev) {
    console.log("Event: Grid Layout Menu Item Click")

    let options = {
        name: 'grid',

        fit: true,                      // whether to fit the viewport to the graph
        padding: 30,                    // padding used on fit
        boundingBox: undefined,         // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
        avoidOverlap: true,             // prevents node overlap, may overflow boundingBox if not enough space
        avoidOverlapPadding: 10,        // extra spacing around nodes when avoidOverlap: true
        nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
        spacingFactor: undefined,       // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
        condense: false,                // uses all available space on false, uses minimal space on true
        rows: undefined,                // force num of rows in the grid
        cols: undefined,                // force num of columns in the grid
        position: function (node) { },  // returns { row, col } for element
        sort: undefined,                // a sorting function to order the nodes; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
        animate: true,                  // whether to transition the node positions
        animationDuration: 1000,        // duration of animation in ms if enabled
        animationEasing: undefined,     // easing of animation if enabled
        animateFilter: function (node, i) { return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
        ready: undefined,               // callback on layoutready
        stop: undefined,                // callback on layoutstop
        transform: function (node, position) { return position; } // transform a given node position. Useful for changing flow direction in discrete layouts 
    };

    editor.SetLayout(options)
    editor.ApplyLayout()

}, false)


var circleLayoutMenuItem = document.getElementById("circlelayout_menuitem")
circleLayoutMenuItem.addEventListener('click', function (ev) {
    console.log("Event: Circle Layout Menu Item Click")

    let options = {
        name: 'circle',

        fit: true,                      // whether to fit the viewport to the graph
        padding: 30,                    // padding used on fit
        boundingBox: undefined,         // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
        avoidOverlap: true,             // prevents node overlap, may overflow boundingBox if not enough space
        avoidOverlapPadding: 10,        // extra spacing around nodes when avoidOverlap: true
        nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
        spacingFactor: undefined,       // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
        condense: false,                // uses all available space on false, uses minimal space on true
        rows: undefined,                // force num of rows in the grid
        cols: undefined,                // force num of columns in the grid
        position: function (node) { },  // returns { row, col } for element
        sort: undefined,                // a sorting function to order the nodes; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
        animate: true,                  // whether to transition the node positions
        animationDuration: 1000,        // duration of animation in ms if enabled
        animationEasing: undefined,     // easing of animation if enabled
        animateFilter: function (node, i) { return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
        ready: undefined,               // callback on layoutready
        stop: undefined,                // callback on layoutstop
        transform: function (node, position) { return position; } // transform a given node position. Useful for changing flow direction in discrete layouts 
    };

    editor.SetLayout(options)
    editor.ApplyLayout()

}, false)

var concentricLayoutMenuItem = document.getElementById("concentriclayout_menuitem")
concentricLayoutMenuItem.addEventListener('click', function (ev) {
    console.log("Event: Concentric Layout Menu Item Click")

    let options = {
        name: 'concentric',

        fit: true,                      // whether to fit the viewport to the graph
        padding: 30,                    // the padding on fit
        startAngle: 3 / 2 * Math.PI,    // where nodes start in radians
        sweep: undefined,               // how many radians should be between the first and last node (defaults to full circle)
        clockwise: true,                // whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false)
        equidistant: false,             // whether levels have an equal radial distance betwen them, may cause bounding box overflow
        minNodeSpacing: 100,             // min spacing between outside of nodes (used for radius adjustment)
        boundingBox: undefined,         // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
        avoidOverlap: true,             // prevents node overlap, may overflow boundingBox if not enough space
        nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
        height: undefined,              // height of layout area (overrides container height)
        width: undefined,               // width of layout area (overrides container width)
        spacingFactor: 2.0,             // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
        concentric: function (node)     { return node.degree(); },  // returns numeric value for each node, placing higher nodes in levels towards the centre
        levelWidth: function (nodes)    { return nodes.maxDegree() / 4;  },// the letiation of concentric values in each level
        animate: true,                  // whether to transition the node positions
        animationDuration: 1500,        // duration of animation in ms if enabled
        animationEasing: undefined,     // easing of animation if enabled
        animateFilter: function (node, i) { return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
        ready: undefined,               // callback on layoutready
        stop: undefined,                // callback on layoutstop
        transform: function (node, position) { return position; } // transform a given node position. Useful for changing flow direction in discrete layouts
    };

    editor.SetLayout(options)
    editor.ApplyLayout()

}, false)

var coseLayoutMenuItem = document.getElementById("coselayout_menuitem")
coseLayoutMenuItem.addEventListener('click', function (ev) {
    console.log("Event: Cose Layout Menu Item Click")

    let options = {
        name: 'cose',

        ready: function () { },     // Called on `layoutready`
        stop: function () { },      // Called on `layoutstop`

        // Whether to animate while running the layout
        // true : Animate continuously as the layout is running
        // false : Just show the end result
        // 'end' : Animate with the end result, from the initial positions to the end positions
        animate: true,              // whether to transition the node positions
        animationDuration: 1500,    // duration of animation in ms if enabled
        animationEasing: undefined, // easing of animation if enabled

        // A function that determines whether the node should be animated
        // All nodes animated by default on animate enabled
        // Non-animated nodes are positioned immediately when the layout starts
        animateFilter: function (node, i) { return true; },
        animationThreshold: 250,    // The layout animates only after this many milliseconds for animate:true (prevents flashing on fast runs)
        refresh: 3,                 // Number of iterations between consecutive screen positions update
        fit: true,                  // Whether to fit the network view after when done
        padding: 30,                // Padding on fit
        boundingBox: undefined,     // Constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
        nodeDimensionsIncludeLabels: true,   // Excludes the label when calculating node bounding boxes for the layout algorithm
        randomize: false,           // Randomize the initial positions of the nodes (true) or use existing positions (false)
        componentSpacing: 40,       // Extra spacing between components in non-compound graphs
        nodeRepulsion: function (node) { return 2048; },  // Node repulsion (non overlapping) multiplier
        nodeOverlap: 4,             // Node repulsion (overlapping) multiplier
        idealEdgeLength: function (edge) { return 32; }, // Ideal edge (non nested) length
        edgeElasticity: function (edge) { return 32; },  // Divisor to compute edge forces
        nestingFactor: 1.2,         // Nesting factor (multiplier) to compute ideal edge length for nested edges
        gravity: 1,                 // Gravity force (constant)
        numIter: 1000,              // Maximum number of iterations to perform
        initialTemp: 1000,          // Initial temperature (maximum node displacement)
        coolingFactor: 0.99,        // Cooling factor (how the temperature is reduced between consecutive iterations
        minTemp: 1.0                // Lower temperature threshold (below this point the layout will end)
    };

    editor.SetLayout(options)
    editor.ApplyLayout()
}, false)

// ---------------------------------------------------------------------------

//
// View / Edit 
//

function ShowNodeInfoDialog() {
    console.log("ShowNodeInfoDialog")
    document.getElementById('nodeInfoCard').style.display = 'block';
}

function HideNodeInfoDialog() {
    console.log("HideNodeInfoDialog")
    document.getElementById('nodeInfoCard').style.display = 'none';
}

function ToggleNodeInfoDialog() {
    console.log('ToggleNodeInfoDialog')

    if (document.getElementById(id).style.display == 'block') {
        document.getElementById(id).style.display = 'none'
    } else {
        document.getElementById(id).style.display = 'block'
    }
} 

// ---------------------------------------------------------------------------

//
// File Load, Save and Export
//

var uploadMenuItem = document.getElementById("uploadJSON_menuitem")
uploadMenuItem.addEventListener('click', function (ev) {
    console.log("Event: File Open Menu Item Click")
    
    // WORKING HERE

    

    // SHOW D&D DIALOG

})

var downloadJSONMenuItem = document.getElementById("downloadJSON_menuitem")
downloadJSONMenuItem.addEventListener('click', function (ev) {
    console.log("Event: File Save JSON Menu Item Click")

    var dataToSave = JSON.stringify(editor.cy.json(), null, 4)
    download("graph.json", dataToSave)

}, false)


var downloadJPGMenuItem = document.getElementById("downloadJPEG_menuitem")
downloadJPGMenuItem.addEventListener('click', function (ev) {
    console.log("Event: File Save JPEG Menu Item Click")

    var dataToSave = editor.cy.jpeg()
    var filename = 'graph.jpeg'

    FileSaver.saveAs(dataToSave, filename);

}, false)


var downloadPNGMenuItem = document.getElementById("downloadPNG_menuitem")
downloadPNGMenuItem.addEventListener('click', function (ev) {
    console.log("Event: File Save PNG Menu Item Click")

    var dataToSave = editor.cy.png()
    var filename = 'graph.png'

    FileSaver.saveAs(dataToSave, filename);

}, false)


