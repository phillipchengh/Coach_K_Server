#Coach K Server

##Response Format

###Success Example
```
{
    "status": "success",
    "data": [
        {"key": "some value goes here"},
        {"key": "another value goes here"}
    ],
    "message": "success message goes here"
}
```
###Error Example
```
{
    "status": "error",
    "data": null,
    "message": "error message goes here"
}
```
##Requests

###Users

```
POST /student
```
Create a student with body parameters according to student schema (WIP). Right now something like

user_id=me@blah.com&genre=indie&distance=0

```
GET /student
    ?user_id=USER_ID
```
Get student with user_id=USER_ID.

```
GET /students
```
Get all students (for debugging purposes now atm).

###Runs

```
POST /run
```
Create a run with body parameters according to run schema (WIP).

```
GET /run
    ?user_id=USER_ID
```
Get all runs associated with user_id=USER_ID.

#Updating Heroku Schema

```
cat create_tables.sql | heroku pg:psql --app coach-k-server
```
