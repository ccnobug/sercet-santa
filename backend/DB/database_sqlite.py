import sqlite3
import json

# con = sqlite3.connect('secret_santa.db')
# cur = con.cursor()
# cur.execute('''CREATE TABLE participants
#                (name text, email text, screte_santa text)''')
# cur.execute("INSERT INTO participants VALUES ('Chen','liuchen1227@gmail.com','Qi")

# con.commit()
# con.close()

def addrec(session_id, date, names, emails, secret_santas):
    con = sqlite3.connect("secret_santa.db")
    cur = con.cursor()
    
    # cur.execute('''CREATE TABLE groups
    #     (id text, 
    #     date text)''')
    cur.execute("INSERT INTO groups (id,date) VALUES (?,?)",(session_id,date))
    # cur.execute('''CREATE TABLE participants
    #     (group_id text, 
    #     name text, 
    #     email text, 
    #     screte_santa text)''')
    for i in range(len(names)):
        name = names[i]
        email = emails[i]
        secret_santa = secret_santas[i]
    
        try:

            # cur.execute('''CREATE TABLE participants
            #     (name text, email text, screte_santa text)''')

            cur.execute("INSERT INTO participants (group_id,name,email,screte_santa) VALUES (?,?,?,?)",(session_id,name,email,secret_santa) )
        except Exception as e:
            print('Exception: {}'.format(e))
            # raise Exception(e)
            con.close()
            return False 
        con.commit()
    con.close()
    return True

def row_to_dict(cursor: sqlite3.Cursor, row: sqlite3.Row) -> dict:
    data = {}
    for idx, col in enumerate(cursor.description):
        data[col[0]] = row[idx]
    return data

def search_rec(uid):
    con = sqlite3.connect("secret_santa.db")   
    # cur = con.cursor()
    con.row_factory = row_to_dict
    # cur.execute("SELECT * FROM participants WHERE group_id=?;", [uid])
    # data = cur.fetchall()
    # print(json.dumps(data))
    result = con.execute("SELECT * FROM participants WHERE group_id=?;", [uid])
    rec = result.fetchall()
    print(rec)
    return rec

