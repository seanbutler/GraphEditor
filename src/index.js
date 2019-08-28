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

var randomLayoutMenuItem = document.getElementById("randomlayout_menuitem")
randomLayoutMenuItem.addEventListener('click', function (ev){
    console.log("Event: Random Layout Menu Item Click")
  
    let options = {
        name: 'random',
        fit: true, // whether to fit to viewport
        padding: 30, // fit padding
        boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
        animate: true, // whether to transition the node positions
        animationDuration: 1000, // duration of animation in ms if enabled
        animationEasing: undefined, // easing of animation if enabled
      };
      
      editor.SetLayout(options)
      editor.ApplyLayout()
}, false)

var gridLayoutMenuItem = document.getElementById("gridlayout_menuitem")
gridLayoutMenuItem.addEventListener('click', function (ev){
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
        position: function( node ){},   // returns { row, col } for element
        sort: undefined,                // a sorting function to order the nodes; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
        animate: true,                 // whether to transition the node positions
        animationDuration: 1000,         // duration of animation in ms if enabled
        animationEasing: undefined,     // easing of animation if enabled
        animateFilter: function ( node, i ){ return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
        ready: undefined,           // callback on layoutready
        stop: undefined,            // callback on layoutstop
        transform: function (node, position ){ return position; } // transform a given node position. Useful for changing flow direction in discrete layouts 
      };
      
      editor.SetLayout(options)
      editor.ApplyLayout()

}, false)



var circleLayoutMenuItem = document.getElementById("circlelayout_menuitem")
circleLayoutMenuItem.addEventListener('click', function (ev){
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
        position: function( node ){},   // returns { row, col } for element
        sort: undefined,                // a sorting function to order the nodes; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
        animate: true,                 // whether to transition the node positions
        animationDuration: 1000,         // duration of animation in ms if enabled
        animationEasing: undefined,     // easing of animation if enabled
        animateFilter: function ( node, i ){ return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
        ready: undefined,           // callback on layoutready
        stop: undefined,            // callback on layoutstop
        transform: function (node, position ){ return position; } // transform a given node position. Useful for changing flow direction in discrete layouts 
      };
      
      editor.SetLayout(options)
      editor.ApplyLayout()

}, false)

var concentricLayoutMenuItem = document.getElementById("concentriclayout_menuitem")
concentricLayoutMenuItem.addEventListener('click', function (ev){
    console.log("Event: Concentric Layout Menu Item Click")

    let options = {
        name: 'concentric',
      
        fit: true,                      // whether to fit the viewport to the graph
        padding: 30,                    // the padding on fit
        startAngle: 3 / 2 * Math.PI, // where nodes start in radians
        sweep: undefined,               // how many radians should be between the first and last node (defaults to full circle)
        clockwise: true, // whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false)
        equidistant: false, // whether levels have an equal radial distance betwen them, may cause bounding box overflow
        minNodeSpacing: 10, // min spacing between outside of nodes (used for radius adjustment)
        boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
        avoidOverlap: true, // prevents node overlap, may overflow boundingBox if not enough space
        nodeDimensionsIncludeLabels: false, // Excludes the label when calculating node bounding boxes for the layout algorithm
        height: undefined, // height of layout area (overrides container height)
        width: undefined, // width of layout area (overrides container width)
        spacingFactor: undefined, // Applies a multiplicative factor (>0) to expand or compress the overall area that the nodes take up
        concentric: function( node ){ 
            // returns numeric value for each node, placing higher nodes in levels towards the centre
            return node.degree();
        },
        levelWidth: function( nodes ){ 
            // the letiation of concentric values in each level
            return nodes.maxDegree() / 4;
        },
        animate: true,                 // whether to transition the node positions
        animationDuration: 1000,         // duration of animation in ms if enabled
        animationEasing: undefined,     // easing of animation if enabled
        animateFilter: function ( node, i ){ return true; }, // a function that determines whether the node should be animated.  All nodes animated by default on animate enabled.  Non-animated nodes are positioned immediately when the layout starts
        ready: undefined, // callback on layoutready
        stop: undefined, // callback on layoutstop
        transform: function (node, position ){ return position; } // transform a given node position. Useful for changing flow direction in discrete layouts
      };
      
      editor.SetLayout(options)
      editor.ApplyLayout()

}, false)

var coseLayoutMenuItem = document.getElementById("coselayout_menuitem")
coseLayoutMenuItem.addEventListener('click', function (ev){
    console.log("Event: Cose Layout Menu Item Click")

    let options = {
        name: 'cose',
      
        // Called on `layoutready`
        ready: function(){},
      
        // Called on `layoutstop`
        stop: function(){},
      
        // Whether to animate while running the layout
        // true : Animate continuously as the layout is running
        // false : Just show the end result
        // 'end' : Animate with the end result, from the initial positions to the end positions
        animate: true,                 // whether to transition the node positions
        animationDuration: 1000,         // duration of animation in ms if enabled
        animationEasing: undefined,     // easing of animation if enabled
      
        // A function that determines whether the node should be animated
        // All nodes animated by default on animate enabled
        // Non-animated nodes are positioned immediately when the layout starts
        animateFilter: function ( node, i ){ return true; },
      
      
        // The layout animates only after this many milliseconds for animate:true
        // (prevents flashing on fast runs)
        animationThreshold: 250,
      
        // Number of iterations between consecutive screen positions update
        refresh: 10,
      
        // Whether to fit the network view after when done
        fit: true,
      
        // Padding on fit
        padding: 30,
      
        // Constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
        boundingBox: undefined,
      
        // Excludes the label when calculating node bounding boxes for the layout algorithm
        nodeDimensionsIncludeLabels: false,
      
        // Randomize the initial positions of the nodes (true) or use existing positions (false)
        randomize: false,
      
        // Extra spacing between components in non-compound graphs
        componentSpacing: 40,
      
        // Node repulsion (non overlapping) multiplier
        nodeRepulsion: function( node ){ return 2048; },
      
        // Node repulsion (overlapping) multiplier
        nodeOverlap: 4,
      
        // Ideal edge (non nested) length
        idealEdgeLength: function( edge ){ return 32; },
      
        // Divisor to compute edge forces
        edgeElasticity: function( edge ){ return 32; },
      
        // Nesting factor (multiplier) to compute ideal edge length for nested edges
        nestingFactor: 1.2,
      
        // Gravity force (constant)
        gravity: 1,
      
        // Maximum number of iterations to perform
        numIter: 1000,
      
        // Initial temperature (maximum node displacement)
        initialTemp: 1000,
      
        // Cooling factor (how the temperature is reduced between consecutive iterations
        coolingFactor: 0.99,
      
        // Lower temperature threshold (below this point the layout will end)
        minTemp: 1.0
      };
      
    editor.SetLayout(options)
    editor.ApplyLayout()
}, false)

// ---------------------------------------------------------------------------
