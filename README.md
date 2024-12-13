Payment Portal

Overview

The Payment Portal is an application designed for customers and employees to facilitate international payments. It allows customers to register, log in, make payments, and interact with the bank's backend system. Employees can manage customer transactions through a secure interface.

This application is built using Node.js, Express, MongoDB, and React for the frontend, and incorporates SonarQube for continuous code quality analysis and CircleCI for continuous integration and deployment.

Features

Customer Registration: Customers can register with a unique ID and password.

Login System: Secure login system for customers and employees.

Payment Processing: Customers can make payments with validation.

Transaction Management: Employees can view and manage customer transactions.

SonarQube Integration: Automated code quality analysis.

CircleCI Integration: Continuous integration for automated testing and deployment.


Prerequisites

Before running the application locally, make sure you have the following installed:

Node.js (v16.x or later)

MongoDB (local or MongoDB Atlas)

npm (Node Package Manager)

SonarQube (for local analysis, if applicable)

CircleCI account (if you are setting up your own CI/CD pipeline)


Installation

1. Clone the repository

Clone the project to your local machine using:

git clone https://github.com/your-username/payment-portal.git

2. Install Dependencies

Navigate to the project directory and install all the required dependencies:

cd payment-portal
npm install

3. Environment Setup

Create a .env file in the root directory and add the necessary environment variables:

DB_CONNSTRING=mongodb+srv://<username>:<password>@cluster0.mongodb.net/mydatabase?retryWrites=true&w=majority
PORT=5000
SSL_KEY_PATH=C:\\path\\to\\your\\server.key
SSL_CERT_PATH=C:\\path\\to\\your\\server.cert
JWT_SECRET=your-secret-key

4. Start the Application

To start the application, run:

node src/server.js

This will start the server on https://localhost:5000.


---

SonarQube Integration

SonarQube is integrated into this project for continuous code quality analysis.

Steps to Run SonarQube Locally

1. Download and install SonarQube from here.


2. Start the SonarQube server.


3. Run the following command to analyze your project:

sonar-scanner \
  -Dsonar.projectKey=payment-portal \
  -Dsonar.sources=src \
  -Dsonar.host.url=http://localhost:9000 \
  -Dsonar.login=<sonar-authentication-token>

Ensure that you replace <sonar-authentication-token> with your actual SonarQube authentication token.


4. Open http://localhost:9000 to view the results.




---

CircleCI Integration

CircleCI is set up for continuous integration and deployment.

Steps for Setting Up CircleCI

1. Sign up for CircleCI: If you don’t have a CircleCI account, sign up at https://circleci.com.


2. Connect GitHub Repository: Link your GitHub repository to CircleCI.


3. CircleCI Configuration: Ensure the .circleci/config.yml file is present in your project. This file contains the pipeline configuration for running tests, building, and deploying the application.



Here’s a sample CircleCI config:

version: 2.1
jobs:
  build:
    docker:
      - image: circleci/node:14
    steps:
      - checkout
      - run:
          name: Install Dependencies
          command: npm install
      - run:
          name: Run Tests
          command: npm test
      - run:
          name: Deploy Application
          command: ./deploy.sh  # Customize this script for your deployment
workflows:
  version: 2
  build_and_deploy:
    jobs:
      - build

Running CircleCI Locally

To test the CircleCI configuration locally, you can use the CircleCI CLI.


---

Testing

The app includes automated testing for both the backend and frontend. To run tests, execute the following command:

npm test

Test Cases:

Backend Tests: API endpoints for registration, login, and payments.

Frontend Tests: React components such as login forms, payment forms, etc.



---

Deployment

For deployment, CircleCI automates the process. You can customize the deploy.sh script in the .circleci/config.yml file to deploy the app to your preferred cloud provider (e.g., AWS, Heroku, DigitalOcean).


---

Conclusion

The Payment Portal application integrates SonarQube and CircleCI for improved code quality and automation. With features such as customer registration, transaction management, and payment processing, along with robust CI/CD pipelines, this payment portal application is ready for deployment in production.

If you encounter any issues or have suggestions for improvement, feel free to open an issue or submit a pull request!


---
