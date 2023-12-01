import psycopg2


DB_NAME = "carlmart"
DB_USER = "postgres"
DB_PASS = "carlsarecool"
DB_HOST = "db"
DB_PORT = "5432"

conn = None

def connect():
    try:
        conn = psycopg2.connect(database=DB_NAME,
                                user=DB_USER,
                                password=DB_PASS,
                                host=DB_HOST,
                                port=DB_PORT)
        cur = conn.cursor()
        return cur, conn
    except(Exception, psycopg2.Error) as error:
        print("Error connecting to PostgreSQL", error)
        return None, None
    
def create_tables():
    """Creates SQL table. Restarts docker container if SQL hasn't initialized yet."""
    cur, conn = connect()
    try:
        # executing queries to create table
        cur.execute("""
        CREATE TABLE IF NOT EXISTS 
            listings(
                listing varchar(30) PRIMARY KEY,
                title varchar(50),
                description varchar(150),
                price int,
                contact varchar(50),
                image bytea,
                tags text
            );
        """)

        cur.execute("""
        CREATE TABLE IF NOT EXISTS 
            users( 
                username varchar(50) PRIMARY KEY,
                listings text,
                rating real
            );
        """)
        
        # commit the changes
        conn.commit()
        conn.close()
        print("Table Created successfully")

    except:
        raise ConnectionError('PostgresSQL rejected connection. Trying again')
    return

def create_data():
    query = "INSERT INTO listings (listing, title, description, price, contact) SELECT 'laz1129231230', 'Calc Textbook', 'Fundamentals of Calculus 9th edition', 50, 'laz@carleton.edu' WHERE NOT EXISTS (SELECT listing FROM listings WHERE listing = 'laz1129231230')"
    query1 = "INSERT INTO listings (listing, title, description, price, contact) SELECT 'moranh1130231045', 'Lamp', 'Used lamp', 10, 'moranh@carleton.edu' WHERE NOT EXISTS (SELECT listing FROM listings WHERE listing = 'moranh1130231045')"    
    query2 = "INSERT INTO listings (listing, title, description, price, contact) SELECT 'nwikeb1201231500', 'Cactus', 'Cute little cactus', 5, 'nwikeb@carleton.edu' WHERE NOT EXISTS (SELECT listing FROM listings WHERE listing = 'nwikeb1201231500')"    
    query3 = "INSERT INTO listings (listing, title, price, contact) SELECT 'quinns0112230950', 'Nintendo Switch', 45, 'quinns@carleton.edu'  WHERE NOT EXISTS (SELECT listing FROM listings WHERE listing = 'quinns0112230950')"
    query4 = "INSERT INTO listings (listing, title, price, contact) SELECT 'quinns0112230950', 'Beanbag chair', 30, 'quinns@carleton.edu'  WHERE NOT EXISTS (SELECT listing FROM listings WHERE listing = 'quinns0112230950')"
    query5 = "INSERT INTO listings (listing, title, price, contact) SELECT 'quinns0112230950', 'Ipad', 800, 'quinns@carleton.edu'  WHERE NOT EXISTS (SELECT listing FROM listings WHERE listing = 'quinns0112230950')"

    queries = [query, query1, query2, query3, query4, query5]
    cur, conn = connect()
    for query in queries:
        cur.execute(query)
    conn.commit()
    cur.close()
    conn.close()


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
    query = 'SELECT * FROM "listings";'
    result = "no result yet"
    try:
        cur.execute(query) 
        result = cur.fetchall()
    except Exception as e:
        print("Error executing SQL query: ", e)
    cur.close()
    conn.close()
    return result



if __name__ == "__main__":
    connect()