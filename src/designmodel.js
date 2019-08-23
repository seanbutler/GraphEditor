
const uuidv1 = require('uuid/v1');

// ----------------------------------------------------------------------

class DesignModel {
    constructor() {
        this.nodes = new Array()
        this.edges = new Array()
    }

    GetNodes(){
        return this.nodes;
    }

    GetEdges(){
        return this.edges;
    }

    AddNode(params) {
        console.log("Add Node To DesignModel")
        this.nodes.push({
            id: uuidv1(),
            label: params.label,
            x: params.x,
            y: params.y
        })
    }

    AddEdge(params) {
        console.log("Add Edge To DesignModel")
        this.edges.push({
            id: uuidv1(),
            label: params.label,
            from: params.from,
            to: params.to,
            data: params.data
        })
    }

    Serialise() {
        return (JSON.stringify(this.nodes) + "\n"
            + JSON.stringify(this.edges) + "\n")
    }

}

// ----------------------------------------------------------------------

var designModel = new DesignModel()

export {
    DesignModel, designModel
}

// ----------------------------------------------------------------------
