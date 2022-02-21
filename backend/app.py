from flask import Flask, current_app, jsonify
from flask import request
import random
from DB import database
import uuid
import datetime
from flask_sqlalchemy import SQLAlchemy
import os
from flask_migrate import Migrate



app = Flask(__name__, static_url_path='', static_folder='build')
# connect to the database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///secret-santa.db'
db = SQLAlchemy(app)
migrate = Migrate(app, db) #separte file?

@app.route("/")
def hello_world():
    return current_app.send_static_file('index.html')



def generate_secret_santa(data,uid):
    rec = {}
    print(data)
    pairing = {}
    senders = list(data.keys())
    receivers = list(data.keys())
    current_receivers = receivers
    for sender in senders:
        print(sender)
        print("current_recevier_list",current_receivers)
        if sender in current_receivers:
            current_receivers.remove(sender)
        pick_receiver = random.choice(current_receivers)
        print("receiver", pick_receiver)
        # sender and receiver send each other 
        if (pick_receiver in pairing.keys()) and (pairing[pick_receiver] == sender):
            current_receivers.remove(pick_receiver)
            new_receiver = random.choice(current_receivers)
            pairing[sender] = new_receiver
            if (sender not in pairing.values()):
                current_receivers.append(sender)
            current_receivers.append(pick_receiver)
            continue
        current_receivers.remove(pick_receiver)
        pairing[sender] = pick_receiver
        if (sender not in pairing.values()):
            current_receivers.append(sender)
    rec["pairing"] = pairing
    rec["uid"] = uid
    return rec

def parse_DB_results(rec):
    result = {} #{name: secret_santa}
    data = {} #{name: email}
    for i in range(len(rec)):
        print(rec[i]["name"])
        print(rec[i]["email"])
        data[rec[i]["name"]] = rec[i]["email"]
        result[rec[i]["name"]] = rec[i]["screte_santa"]
    return result, data


@app.route("/generator", methods=["POST"])
def generator():
    # name: email dic
    data = request.json
    session_id = str(uuid.uuid4())
    date = datetime.datetime.now().isoformat()
    print(session_id,date)
    # name: secret_santa dic
    secret_st_dic = generate_secret_santa(data, session_id)
    print("pass")
    status = database.addrec(session_id, date, list(data.keys()), list(data.values()), list(secret_st_dic["pairing"].values()))
    print("---------------------------------------adrect result")
    print(status)
    if status == True:
        return generate_secret_santa(data, session_id)
    else:
        return {} 

@app.route("/searchhistory", methods=["POST"])
def search_history():
    uid = list(request.form.to_dict().keys())[0]
    print(uid)
    rec = database.search_rec(uid)
    print(rec)
    result, data = parse_DB_results(rec)
    data_result = {"result": result, "data": data}
    print(result)
    print(data)
    return data_result


