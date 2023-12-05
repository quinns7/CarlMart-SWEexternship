from flask import Flask, jsonify, request
import psycopg2
import functionality
from flask_cors import CORS  # Import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

@app.route('/')
@app.route('/home')
def homepage():
    #return render_template('home.html')
    functionality.create_tables()
    functionality.create_data()
    listings = functionality.select_all_listings()
    # return {"home": ["backend info 1", "backend info 2", "backend info 3"]}
    return {"home": listings}


@app.route('/login', methods=["POST"])
def login():
    if request.method == "POST":
        data = request.get_json(silent=True)
        if data is not None:
            print("This is the data from the login page: ", flush=True)
            for key in data:
                print(key + ": " + str(data[key]))
            # Process the received data or perform necessary operations
            # For example: save data to a database, perform calculations, etc.
            return jsonify({"message": "Data received successfully"}) #200
        else:
            return jsonify({"message": "No Json data received"})  # Return a bad request status if no JSON data found. 400
    return jsonify({"login": "no info received"})

#TODO make listing id connect to signed-in username
#TODO make some helper functions
@app.route('/new-listing', methods=["POST"])
def create_item_listing():
    if request.method == "POST":
        data = request.get_json()
        if data is not None:
            data_list = []
            columns = "("
            for key in data:
                    print(data[key])
                    if data[key] is not '':
                        print("in if statement")
                        data_list.append(data[key])
                        columns += key + ", "
            now = datetime.now()
            dt_string = now.strftime("%m%d%Y%H%M")
            listing_id = "quinns" + dt_string
            columns += "listing)"
            data_list.append(listing_id)
            parsed_data = str(tuple(data_list))
            print(parsed_data, flush=True)
            print(columns, flush=True)
            functionality.insert_row("listings", columns, parsed_data)
            print(functionality.select_all_listings())
            return jsonify({"message": "Json data received"})
        else:
            return jsonify({"message": "No Json data received"})  # Return a bad request status if no JSON data found. 400
    return

@app.route('/new_user', methods=["POST"])
def create_user():
    data = request.get_json()
    data_list = []
    for key in data:
        data_list.append(data[key])

    parsed_data = tuple(data_list)
    functionality.insert_row("Users", parsed_data)

    #return render_template('home.html')
    return


#format: .../user?username=bobby
@app.route('/user')
def get_user_profile():
    user_name = request.args.get('username')
    row = functionality.select_data("Users", "username", user_name)
    #return render_template('home.html')
    return row

#Clicking a link to an item should open up that item's page with a url of /item?listing=quinns214532t645325
@app.route('/item', methods=['GET'])
def get_item():
    # Assuming you want to fetch all items for the '/api/item' endpoint
    items = functionality.select_all_listings()
    return jsonify(items)

@app.route('/item/delete')
def delete_listing():
    item = request.args.get('listing')
    result = functionality.delete_data("listings", "listing", item)
    if result == 1:
        return "Data deleted successfully", 200
    else:
        return "Deletion failed", 400

#Debating whether to leave this as constructing the contact under the assumption that it's an email
@app.route('/my_items', methods =['GET'])
def view_items():
    id = request.args.get('username')
    user = id + "@carleton.edu"
    listings = None
    try:
        listings = functionality.select_data("Listings", "contact", user)
        return jsonify(listings)
    except Exception as e:
        print("Error: ", e)
        return "No data at that location", 400 
    

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)  # The port is specified here