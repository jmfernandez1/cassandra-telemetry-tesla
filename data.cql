-- Create a keyspace
CREATE KEYSPACE IF NOT EXISTS tesla WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : '1' };

-- Create a table
CREATE TABLE IF NOT EXISTS tesla.event (
id uuid PRIMARY KEY,
name text,
value text,
last_update_timestamp timestamp
);

-- Insert some data
INSERT INTO tesla.event
(id, name,value, last_update_timestamp)
VALUES ('9876', 'temperatura',2, toTimeStamp(now()));

