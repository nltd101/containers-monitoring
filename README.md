# Container Monitoring
## Introduction
Container Monitoring is a system analyzing many factors that affect the quality of products on containers. The system applies machine learning to predict a decline in the quality of the product in the period of transportation and the time for maintenance of the equipment of the refrigerated containers.
## Installation

Backend requires [python3.8](https://www.python.org/) to run server.
Frontend requires [nodejs](https://nodejs.org/) to run client.

### Backend

Install the requirement file and start the server.

```sh

cd backend
python -m pip install --user virtualenv # It's for the first time
python -m venv env # It's for the first time
.\env\Scripts\activate
pip install -r requirements.txt
python manage.py runserver
```

### Frontend

Let's install the dependencies and devDependencies and start the client.

```sh
cd frontend
yarn
yarn start
```

## The git-flow

The flow to develop a new feature is initing a new branch then creating a pull request on Github.

[To Generating a new SSH key and adding it to the ssh-agent](https://docs.github.com/en/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

- Before changing the source code, let's run the command to switch to the branch
  ```
  # if the branch wasn't exist
  git checkout -b {the branch name}
  # if the branch was exist
  git checkout {the branch name}
  git pull origin develop
  ```
- Coding a new feature
- After the change is complete, let's run the commands to commit code
  ```
  git add [the name file was changed]
  git commit -m"the message"
  git push origin {the branch name}
  ```
- Finally, you should create a pull request for the branch on the GitHub
