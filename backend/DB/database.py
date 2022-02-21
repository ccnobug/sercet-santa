from sqlalchemy import create_engine, Column, Integer, String, ForeignKey, MetaData, Table
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, relationship
from sqlalchemy.sql import select
import pandas as pd



Base = declarative_base()
engine = create_engine('sqlite:///secret-santa.db?check_same_thread=False',echo=True)
meta = MetaData()
conn = engine.connect()
# Session = sessionmaker(bind=engine)
# session = Session()

# class Groups(Base):
#     __tablename__ = "groups"

#     id = Column('id', String, primary_key=True)
#     date = Column('date', String, unique=False)

Base.metadata.create_all(bind=engine) #which is equivalent to 'create table'
groups = Table(
   'groups', meta, 
   Column('id', String), 
   Column('date', String)
)
participants = Table(
   'participants', meta, 
   Column('group_id', String, ForeignKey('groups.id')), 
   Column('name', String),
   Column('email', String),
   Column('screte_santa', String)
)
meta.create_all(engine)

def addrec(session_id, date, names, emails, secret_santas):
    print("---------------------------------------in adrec")

    group_df = pd.DataFrame({"id":[session_id],"date":[date]})
    print("--------groupdf",group_df)
    group_df.to_sql('groups',con=engine,if_exists='append',index=False)
    print("---------------------------------------group table")
    # for i in range(len(names)):
    #     name = names[i]
    #     email = emails[i]
    #     secret_santa = secret_santas[i]
    try:
        participant_df = pd.DataFrame({"group_id":session_id,"name":names,"email":emails,"screte_santa":secret_santas})
        print("--------participantsdf",participant_df)
        # try:
        # , schema='secret-santa.db'
        participant_df.to_sql('participants',con=conn,if_exists='append',index=False)
        print("---------------------------------------participants table")
        # except Exception as e:
        # print("------error-----",e)
    except Exception as e:
        print('Exception: {}'.format(e))
        # raise Exception(e)
        print("----------error",e)
        return False
    table = meta.tables['groups']
    select_st = select([table])
    rec = conn.execute(select_st)

    for row in rec:
       print (row)
    return True

#Insert single data
    # group = Groups(id='1',date='2022-02-01')
    # session.add(group)
    # session.commit()
#Insert batch data
    # df = pd.DataFrame({"id":"435345","date":['2020-02-11','2020-02-12','2020-02-13']})
    # df.to_sql('groups',con=engine,if_exists='append',index=False)

def search_rec(uid):
    table = meta.tables['participants']
    select_st = select([table]).where(table.c.group_id == uid)
    result = conn.execute(select_st)
    rec = result.fetchall()
    # result = con.execute("SELECT * FROM participants WHERE group_id=?;", [uid])
    # rec = result.fetchall()
    print(rec)
    return rec

#for debug
    # s = select([groups])
    # # result = conn.execute(s)
    # table = meta.tables['groups']
    # select_st = select([table]).where(table.c.id == "435345")
    # rec = conn.execute(select_st)

    # for row in rec:
    #    print (row)
