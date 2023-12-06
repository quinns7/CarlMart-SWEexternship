from flask import Flask, jsonify, request
import psycopg2
import functionality
from flask_cors import CORS  # Import CORS
from dotenv import load_dotenv
import cloudinary
import cloudinary.uploader
import cloudinary.api
from datetime import datetime


app = Flask(__name__)
CORS(app)

def initCloudinary():
    load_dotenv()
    return cloudinary.config(secure=True)

@app.route('/')
@app.route('/home')
def homepage():
    functionality.create_tables()
    functionality.create_data()
    listings = functionality.select_all_listings()
    global cloudinaryConfig
    cloudinaryConfig = initCloudinary()
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

@app.route('/new-listing', methods=["POST"])
def post_item_listing():
    if request.method == "POST":
        data = request.get_json()
        if data is not None:
            columns, parsed_data = functionality.create_new_listing(data)
            functionality.insert_row("listings", columns, parsed_data)
            return jsonify({"message": "Json data received"})
        else:
            return jsonify({"message": "No Json data received"})  # Return a bad request status if no JSON data found. 400
    return

@app.route("/get-signature", methods=["GET"])
def get_signature():
    timestamp = round(datetime.utcnow().timestamp())
    params = {'timestamp': timestamp}
    signature = cloudinary.utils.api_sign_request(params, cloudinaryConfig.api_secret)
    return jsonify({'timestamp': timestamp, 'signature': signature})

@app.route("/use-photos", methods=["POST"])
def use_photos():
    public_id = request.json.get('public_id')
    version = request.json.get('version')
    signature = request.json.get('signature')
    params = { 'public_id': public_id, 'version': version }
    expectedSignature = cloudinary.utils.api_sign_request(params, cloudinaryConfig.api_secret)
    if expectedSignature == signature:
        print("public_id", public_id,flush=True)
        pass
    return

@app.route('/signup', methods=["POST"])
def create_user():
    data = request.get_json()
    data_list = []
    for key in data:
        data_list.append(data[key])

    parsed_data = tuple(data_list)
    functionality.insert_row("users", parsed_data)

    #return render_template('home.html')
    return


#format: .../user?username=bobby
@app.route('/user')
def get_user_profile():
    user_name = request.args.get('username')
    row = functionality.select_data("users", "username", user_name)
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
        listings = functionality.select_data("listings", "contact", user)
        return jsonify(listings)
    except Exception as e:
        print("Error: ", e)
        return "No data at that location", 400 
    

if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=5000)  # The port is specified here