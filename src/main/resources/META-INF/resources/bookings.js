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
            var query = n.nodeName.toLowerCase();
            var fields = n.getAttribute("fields");
            
            innerQueries.set(camelCase(query.substr(0, query.indexOf(':'))) ,fields);
            
            for (var i = 0, atts = n.attributes, size = atts.length, arr = []; i < size; i++){
                var attName = atts[i].nodeName;
                if(attName !== "fields"){
                    var attVal = atts[i].nodeValue;
                    arr.push(attName + ":" + attVal);
                }
            }
            if(arr.length === 0){
                return camelCase(query) + "{" + fields + "}";
            }else{
                return camelCase(query) + "(" + arr.join() + ") {" + fields + "}";
            }
        }
                
        
        ).join(' ');
        
        var request =   `query DailyBookings {
                            daily:slots{
                                `
                                + this.fields + ` 
                                ` + nodes + 
                            `
                            }
                        }`;
          
        var content = graphQLRequest(request, {}, "DailyBookings").then(response => {
            var dailySlots = response.data.daily;
            var errors = response.errors;
            
            if(dailySlots === null && errors !== null){
                return "There are errors";
            }else{
                
                var slotFields = this.fields.split(" ");
                return html`
                
                    <table part="table">
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
    var innerObject = object[key];
    if(innerObject === null){
        return "";
    }
    return innerObject[field];
}

function camelCase(input) { 
    return input.toLowerCase().replace(/-(.)/g, function(match, group1) {
        return group1.toUpperCase();
    });
}

customElements.define('booking-table', BookingTable);

