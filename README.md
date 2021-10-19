# Container Monitor

## Installation

Backend requires [python3](https://www.python.org/) to run server.
Frontend requires [nodejs](https://nodejs.org/) to run client.

### Backend
Install the requirement file and start the server.
```sh
#For the first time:
cd backend
pip install -r requirements.txt
python manage.py runserver
```
### Frontend
In the firs time, you have to install the yarn package by command
```
npm install --global yarn
```
Afterthat, let install the dependencies and devDependencies and start the client.

```sh
cd frontend
yarn
yarn start
```
## The flow
The flow to develop a new feature is initing a new branch then creating a pull request on github
- Before changing the source code, let run the command to switch to the branch
    ```
    # if the branch wasn't exist
    git checkout -b {the branch name} 
    # if the branch was exist
    git checkout {the branch name} 
    git pull origin main
    ```
- Codeing a new feature
- After the change is complete, let run the commands to commit code
    ```
    git add [the name file was changed]
    git commit -m"the message"
    git push origin {the branch name}
    ```
