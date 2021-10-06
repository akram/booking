/* 
 * Some graphql related helper functions
 */
let documentpath = '/graphql';

const scriptTags = document.scripts;
for (let i = 0; i < scriptTags.length; i++) {
    let url = new URL(scriptTags[i].src);
    if(url.pathname.endsWith("/bookings.js")){
        documentpath = url.origin + documentpath;
    }
}

export async function graphQLRequest(query, variables = {}, operationName = ""){
    
    try {
        const response = await fetch(documentpath, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(
                {
                    "query":query,
                    "variables":variables,
                    "operationName":operationName
                }
            )
        });
        return await response.json();
    } catch (error) {
        throw error;
    }
}