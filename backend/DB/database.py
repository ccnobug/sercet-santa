import sqlite3

# con = sqlite3.connect('secret_santa.db')
# cur = con.cursor()
# cur.execute('''CREATE TABLE participants
#                (name text, email text, screte_santa text)''')
# cur.execute("INSERT INTO participants VALUES ('Chen','liuchen1227@gmail.com','Qi")

# con.commit()
# con.close()

def addrec(names, emails, secret_santas):
    con = sqlite3.connect("secret_santa.db")
    cur = con.cursor()
    
    for i in range(len(names)):
        name = names[i]
        email = emails[i]
        secret_santa = secret_santas[i]
    
        try:
            cur.execute('''CREATE TABLE participants
                (name text, email text, screte_santa text)''')
            cur.execute("INSERT INTO participants (name,email,screte_santa) VALUES (?,?,?)",(name,email,secret_santa) )
        except Exception as e:
            print('Exception: {}'.format(e))
            # raise Exception(e)
            con.close()
            return False 
        con.commit()
    con.close()
    return True