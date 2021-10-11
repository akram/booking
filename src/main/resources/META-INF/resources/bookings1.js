import {graphQLRequest} from '/graphql.js';

import {LitElement, html} from 'https://unpkg.com/lit@2.0.0/index.js?module';
import {until} from 'https://unpkg.com/lit@2.0.0/directives/until.js?module';

export class BookingTable extends LitElement {
    
    static properties = {
        fields: {type: String},
    };

    constructor(){
        super();
        this.fields = "startTime peak"; // default
    }

    render() {
        
        const innerQueries = new Map();

        let nodes = [...this.children].map(n => {
            const query = n.nodeName.toLowerCase();
            const fields = n.getAttribute("fields");
            
            innerQueries.set(camelCase(query.substr(0, query.indexOf(':'))) ,fields);
            
            for (var i = 0, atts = n.attributes, size = atts.length, arr = []; i < size; i++){
                let attName = atts[i].nodeName;
                if(attName !== "fields"){
                    let attVal = atts[i].nodeValue;
                    arr.push(attName + ":" + attVal);
                }
            }
            if(arr.length === 0){
                return camelCase(query) + "{" + fields + "}";
            }else{
                return camelCase(query) + "(" + arr.join() + ") {" + fields + "}";
            }
        }).join(' ');
        
        const request =   `query DailyBookings {
                            daily:slots{
                                `
                                + this.fields + ` 
                                ` + nodes + 
                            `
                            }
                        }`;
          
        const content = graphQLRequest(request, {}, "DailyBookings").then(response => {
            let dailySlots = response.data.daily;
            let errors = response.errors;
            
            if(dailySlots === null && errors !== null){
                return "There are errors";
            }else{
                
                const slotFields = this.fields.split(" ");
                return html`
                
                    <table part="table">
                        <thead part="thead">
                            <tr part="tr">
                                ${slotFields.map(field => html`
                                    <th part="th">
                                        ${camelize(field)}
                                    </th>
                                `)}
                                ${[...innerQueries.keys()].map(key => html`    
                                    ${innerQueries.get(key).split(" ").map(innerField => html`
                                    <th part="th">
                                        ${camelize(key)}
                                    </th>    
                                    `)}
                                `)}
                            </tr>
                        </thead>
                        <tbody part="tbody">
                            ${dailySlots.map(dailySlot => html`
                            <tr part="tr">
                                ${slotFields.map(field => html`
                                    <td part="td">
                                        ${dailySlot[field]}
                                    </td>
                                `)}
                
                                ${[...innerQueries.keys()].map(key => html`
                                    ${innerQueries.get(key).split(" ").map(innerField => html`
                                        <td part="td">
                                        ${getInnerField(dailySlot,key,innerField)}
                                        </td>
                                    `)}
                                `)}    
                            </tr>`)}
                        </tbody>
                    </table>`;
            }
        });
        return html`${until(content, html`<loading>Loading...</loading>`)}`;
    };
    
};

function getInnerField(object, key, field){
    let innerObject = object[key];
    if(innerObject === null){
        return "";
    }
    return innerObject[field];
}

// From aB to A b
function camelize(str) {
    var f = str.charAt(0);
    return f.toUpperCase() + str.slice(1);
}

// From a-b to aB
function camelCase(input) { 
    return input.toLowerCase().replace(/-(.)/g, function(match, group1) {
        return group1.toUpperCase();
    });
}

customElements.define('booking-table', BookingTable);