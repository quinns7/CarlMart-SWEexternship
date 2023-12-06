from flask import Flask, jsonify, request
import psycopg2
import functionality
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)

functionality.create_tables()

@app.route('/')
@app.route('/home')
def homepage():
    #return render_template('home.html')
    functionality.create_tables()
    functionality.create_data()
    listings = functionality.select_all_listings()
    return {"home": listings}


@app.route('/login', methods=["POST"])
def login():
    data = request.get_json()
    user = functionality.select_data("users", "username", data['username'])
    if user and user[0][1] == data['password']:
        return jsonify({"message": "Login successful"}), 200
    else:
        return jsonify({"message": "Invalid username or password"}), 401

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


@app.route('/signup', methods=["POST"])
def create_user():
    try:
        data = request.get_json()
        print("Received data:", data)

        existing_user = functionality.select_data("users", "username", data['username'])
        if existing_user:
            return jsonify({"message": "User already exists"}), 400

        # Format data as a string tuple
        user_data = f"('{data['username']}', '{data['password']}')"
        functionality.insert_row("users", "(username, password)", user_data)

        return jsonify({"message": "User created successfully"}), 201

    except Exception as e:
        print("Signup Error:", e)
        return jsonify({"message": "Internal server error"}), 500

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