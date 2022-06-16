# Colorifix Task

This project is about the assigning of the users with their respective permissions group.
Follow the instructions to set up the server section of the project.

### Prerequisites

- Install [Python](https://www.python.org/downloads/)

### Setting Up a Project

Clone repository:

```
git clone https://github.com/avneetsingh4555/colorifix-assignment.git
```

### Activate the Environment

```
cd ./colorifix-assignment/server

source env/Scripts/activate
```

cd ./usermanager

### Set up the Model Migrations

python manage.py makemigrations usermanager

python manage.py migrate usermanager

python manage.py migrate

### Create the Super User and Add Values to DB

python manage.py createsuperuser

### Run Server

python manage.py runserver

The serve command will serve application on following url: `http://127.0.0.1:8000/`
