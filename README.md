# Container Monitor

## Installation

Backend requires [python3.8](https://www.python.org/) to run server.
Frontend requires [nodejs](https://nodejs.org/) to run client.

### Backend

Install the requirement file and start the server.

```sh

cd backend
python -m pip install --user virtualenv # It 's for the first time
python -m venv env # It 's for the first time
.\env\Scripts\activate
pip install -r requirements.txt
python manage.py runserver
```

### Frontend

Let install the dependencies and devDependencies and start the client.

```sh
cd frontend
yarn
yarn start
```

## The flow

The flow to develop a new feature is initing a new branch then creating a pull request on github.

[To Generating a new SSH key and adding it to the ssh-agent](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

- Before changing the source code, let run the command to switch to the branch
  ```
  # if the branch wasn't exist
  git checkout -b {the branch name}
  # if the branch was exist
  git checkout {the branch name}
  git pull origin develop
  ```
- Codeing a new feature
- After the change is complete, let run the commands to commit code
  ```
  git add [the name file was changed]
  git commit -m"the message"
  git push origin {the branch name}
  ```
- Finally, you should create a pull request for the branch on the github
