
// ----------------------------------------------------------------------

export default class Textview_Component {
    constructor(doc, context) {

        this.context = context

        // var para = doc.createElement("p")
        // var node = doc.createTextNode("This is new.")
        // para.appendChild(node)

        var formHTML = '<form><div class="form-group"><label for="controlTextarea1">Example textarea</label><textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea></div></form>'

        this.context.innerHTML = formHTML
    }
}

// ----------------------------------------------------------------------
