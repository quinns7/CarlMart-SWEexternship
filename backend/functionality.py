import psycopg2


DB_NAME = "carlmart"
DB_USER = "postgres"
DB_PASS = "carlsarecool"
DB_HOST = "db"
DB_PORT = "5432"

conn = None

def connect():
    try:
        global conn
        conn = psycopg2.connect(database=DB_NAME,
                            user=DB_USER,
                            password=DB_PASS,
                            host=DB_HOST,
                            port=DB_PORT)
        cur = conn.cursor()
        print("Connected to database!", flush=True)
        return cur, conn
    except(Exception, psycopg2.Error) as error:
        print("Error connecting to PostgreSQL", error) 
        return 
    
#grabs a specific column list from the specifed table.  
#Returns a list of tuples
def select_query(table, column):
    cur, conn = connect()
    query = 'SELECT ' + column + 'from ' + table
    cur.execute(query)
    results = cur.fetchall()
    cur.close()
    conn.close()
    return results

#Fetches a row in the chosen table based on a specific column and id
#Useful if looking for data related to a specifc user, item, etc.
#Returns a list of tuples
def select_data(table, column, id):
    cur, conn = connect()
    query = 'SELECT * from ' + table + " WHERE " + column + " = " + id
    cur.execute(query) 
    result = cur.fetchall()
    cur.close()
    conn.close()
    return result

#Insert a tuple of data into a SQL table
#Format:
#-Users: (username, listings, rating)
#-Listings: (listing, title, description, price, contact, image)
def insert_row(table, data):
    cur, conn = connect()
    query = 'INSERT INTO ' + table + ' VALUES ' + data
    cur.execute(query)
    cur.close()
    conn.close()
    return

def select_all_listings():
    cur, conn = connect()
    query = 'SELECT * FROM users;'
    cur.execute(query) 
    result = cur.fetchall()
    cur.close()
    conn.close()
    return result

if __name__ == "__main__":
    connect()