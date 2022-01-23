from flask import Flask, current_app, jsonify
from flask import request
import random
from DB import database

app = Flask(__name__, static_url_path='', static_folder='build')

@app.route("/")
def hello_world():
    return current_app.send_static_file('index.html')


# @app.route("/text")
# def get_text():
#     return "<h1> text</h1>"

# @app.route("/test", methods=["GET"])
# def get_test():
#     return jsonify({"hahha": "xixixi"}), 200
test_data = {"Chen": "dev+2@unata.com",
        "c": "abcde@gmail.com",
        "shu qi": "liuchen1227@gmail.com",
        "brother": "b123423@gmail.com"}

test_data_2 = {"Chen": "dev+2@unata.com",
        "c": "abcde@gmail.com"}

def generate_secret_santa(data):
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
        current_receivers.remove(pick_receiver)
        pairing[sender] = pick_receiver
        if (sender not in pairing.values()):
            current_receivers.append(sender)
    return pairing


@app.route("/generator", methods=["POST"])
def generator():
    # name: email dic
    data = request.json
    # name: secret_santa dic
    secret_st_dic = generate_secret_santa(data)
    status = database.addrec(list(data.keys()), list(data.values()), list(secret_st_dic.values()))
    if status == True:
        return generate_secret_santa(data)
    else:
        return {} 



