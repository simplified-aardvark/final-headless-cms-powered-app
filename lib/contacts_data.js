//NEED TO: npm install got
import got from "got";

const dataURL = "https://dev-week11-a11.pantheonsite.io/wp-json/twentytwentyone-child/v1/a14/contacts";

export async function get_all_contact_ids() {
    let jsonString;

    try {
        jsonString = await got(dataURL);
        // console.log(jsonString.body)
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


export async function get_sorted_contact_list() {
    let jsonString;

    try {
        jsonString = await got(dataURL);
        // console.log(jsonString.body)
    } catch(error) {
        jsonString.body = [];
        console.log(error);
    }

    const jsonObj = JSON.parse(jsonString.body);

    jsonObj.sort(
        function(a, b) {
            return a.first_name.localeCompare(b.first_name);
        }
    );


    return jsonObj.map(
        item => {
            return {
                id: item.ID.toString(),
                first_name: item.first_name,
                last_name: item.last_name,
                phone: item.phone
            }
        }
    );
}


export async function get_contact_data(req_id) {
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
