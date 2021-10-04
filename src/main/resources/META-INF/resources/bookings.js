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
            innerQueries.set(camelCase(n.nodeName.toLowerCase()), n.getAttribute("fields"));
            return camelCase(n.nodeName.toLowerCase()) + "{" + n.getAttribute("fields") + "}";
        }).join(' ');
        
        var request =   `query DailyBookings {
                            daily:slots{`
                                + this.fields +
                            `}
                        }`;
          
        var content = graphQLRequest(request, {}, "DailyBookings").then(response => {
            var dailySlots = response.data.daily;
            var errors = response.errors;
            
            if(dailySlots === null && errors !== null){
                return "There are errors";
            }else{
                
                var slotFields = this.fields.split(" ");
                return html`
                
                    <table part="bookings-table">
                        <thead>
                            <tr>
                                ${slotFields.map(field => html`
                                    <th>
                                        ${camelize(field)}
                                    </th>
                                `)}
                            </tr>
                        </thead>
                        <tbody>
                            ${dailySlots.map(dailySlot => html`
                            <tr>
                                ${slotFields.map(field => html`
                                    <td>
                                        ${dailySlot[field]}
                                    </td>
                                `)}
                            </tr>`)}
                        </tbody>
                    </table>`;
            }
        });
        
        return html`${until(content, html`<loading>Loading...</loading>`)}`;
        
    };
    
};


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

