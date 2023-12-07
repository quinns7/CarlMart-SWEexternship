from flask import Flask, jsonify, request
import psycopg2
import functionality
from flask_cors import CORS 

app = Flask(__name__)
CORS(app)

functionality.create_tables()

@app.route('/')
@app.route('/home')
def homepage():
    functionality.create_tables()
    functionality.create_data()
    listings = functionality.select_all_listings()
    return {"home": listings}


@app.route('/login', methods=["POST"])
def login():
    data = request.get_json()
    print("Received login request:", data)  

    if not data['username'] or not data['password']:
        return jsonify({"message": "Username or password missing"}), 400

    user = functionality.select_data("users", "username", data['username'])

    if user:
        print("User found:", user)  
        if user[0][2] == data['password']: 
            return jsonify({"message": "Login successful"}), 200
        else:
            print("Password mismatch: DB:", user[0][2], "Input:", data['password'])
            return jsonify({"message": "Invalid password"}), 401
    else:
        print("User not found:", data['username'])
        return jsonify({"message": "Invalid username"}), 401


@app.route('/new-listing', methods=["POST"])
def post_item_listing():
    if request.method == "POST":
        data = request.get_json()
        if data is not None:
            columns, parsed_data = functionality.create_new_listing(data)
            functionality.insert_row("listings", columns, parsed_data)
            return jsonify({"message": "Json data received"})
        else:
            return jsonify({"message": "No Json data received"}) 
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
        # Remove the extra closing parenthesis after 'lastname'
        user_data = f"('{data['username']}', '{data['email']}', '{data['password']}', '{data['firstname']}', '{data['lastname']}')"

        functionality.insert_row("users", "(username, email, password, firstname, lastname)", user_data)

        return jsonify({"message": "User created successfully"}), 201

    except Exception as e:
        print("Signup Error:", e)
        return jsonify({"message": "Internal server error"}), 500

#format: .../user?username=bobby
@app.route('/user')
def get_user_profile():
    username = request.args.get('username')
    row = functionality.select_data("users", "username", username)
    if row:
        # Assuming row is a list of tuples, where each tuple represents a row in the database
        user_data = row[0]
        return jsonify({
            "username": user_data[0],
            "email": user_data[1],
            "password": user_data[2],  # might want to remove this for security reasons
            "firstname": user_data[3],
            "lastname": user_data[4]
        })
    else:
        return jsonify({"message": "User not found"}), 404


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