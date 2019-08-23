
const uuidv1 = require('uuid/v1');
var d3 = require('d3')

// ----------------------------------------------------------------------

class DesignView {
    constructor(drawing) {

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
        this.svg.selectAll("circle")
                    .data(this.data)
                    .enter()
                    .append("svg:circle")
                    .attr("cx", function(d) {return d.x})
                    .attr("cy", function(d) {return d.y})
                    .attr("r", 50)
                    .attr("class", "node")
                    .attr("id",function(d){return d.id})
                    .attr("fill", "#FFF")
                    .attr("stroke", "#333")
                    .attr("stroke-width", "2")
                    .on("click", function(d){console.log(JSON.stringify(d))});
    }
}

// ----------------------------------------------------------------------

var designView = new DesignView()

export {
    DesignView, designView
}

// ----------------------------------------------------------------------
