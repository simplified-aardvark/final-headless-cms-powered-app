//NEED TO: npm install got
import got from "got";

const dataURL = "https://dev-week11-a11.pantheonsite.io/wp-json/twentytwentyone-child/v1/a14/companies";

export async function get_all_company_ids() {
    let jsonString;

    try {
        jsonString = await got(dataURL);

    } catch(error) {
        jsonString.body = [];
        console.log(error);
    }

    const jsonObj = JSON.parse(jsonString.body);

    return jsonObj.map(
        function(item) {
            return {
                params: {
                    id: item.ID.toString()

                }
            };
        }
    );
}


export async function get_sorted_company_list() {
    let jsonString;

    try {
        jsonString = await got(dataURL);

    } catch(error) {
        jsonString.body = [];
        console.log(error);
    }

    const jsonObj = JSON.parse(jsonString.body);

    jsonObj.sort(
        function(a, b) {
            return a.company_name.localeCompare(b.company_name);
        }
    );


    return jsonObj.map(
        item => {
            return {
                id: item.ID.toString(),
                company_name: item.company_name,
                ceo: item.ceo
            }
        }
    );
}


export async function get_company_data(req_id) {
    let jsonString;

    try {
        jsonString = await got(dataURL);
        // console.log(jsonString.body)
    } catch(error) {
        jsonString.body = [];
        console.log(error);
    }

    const jsonObj = JSON.parse(jsonString.body);

    console.log(jsonObj);
    // find object value in array that has matching id
    let obj_match = jsonObj.filter(
        function(obj) {
            return obj.ID.toString() === req_id;
        }
    );

  return obj_match.length > 0 ? obj_match[0] : {};
}
