This repo contains the front and back ends of the ecCommerce group project.

Hello! Thank you for choosing Catalyte for your software needs, to get your API frontend up and running just follow these simple steps below. 

***These steps are assuming you have our database( e-commerceRT ) already setup and running on port 8080***

1. Open your IDE (i.e. VisualStudio Code) then click File in the upper left and go down to Open Folder, and select the folder you have all the frontend files in.

2. Once the project is open, go to the top navbar once again and select Terminal,and go down and click the 'New Terminal' option.

3. With the terminal open, make sure you have the project file selected in the file path(if it is not on the file it should be on, type 'cd\' into the terminal window and hit enter, and now type the proper file path into your terminal window and hit enter)
With the file selected, in the terminal type 'npm install', it might take a minute to install all the files.

4. To run the tests just enter 'npm run coverage' to the terminal and hit enter

5. With the file now installed and tested type 'npm start' into the terminal window, this may take a minute as well, once its finished the webpage will automatically open in your default browser.

6. Once open you will be able to operate the website, the current default logins are below.
Admins can perform extra operations, User and Customer can only read data. Once logged in you should be good to go.

        email: admin@catalyte.io  
        password: pass@word1         

        email: user@catalyte.io 
        password: pass@word1 

        email: customer@catalyte.io 
        password: pass@word1        




This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify


# SAHARA API
This is a RESTFUL API for a customer facing online store that supports CRUD functionality, validation, and high level domain searches.

This program comes with a dataloader that prepopulates the database with a sample set of products and users

This program uses the [RedTeam Frontend](https://gitlab.catalyt.es/training/cycleworkinggroups/denver/denver_2019_cycle_1/_associates/canderson/projects/redteam_frontend).

### Getting Started

These instructions will get you a copy of the project up and running on your local
machine for development and testing purposes.

1. Create a Postgresql database with the same name in the application.yml file
2. Import the project in IntelliJ.
3. Run the application.
4. Use the application.yml file to configure the initial actions once the program is running for future runs.
5. Set ddl-auto from create-drop to none and remove the dataloader package from the file path if you do not want to run the
   dataloader on subsequent runs.

### Swagger

To use the Swagger UI, navigate to [http://localhost:8080/swagger-ui.html#/](http://localhost:8080/swagger-ui.html#/)


### Running the Unit Tests
1. Make sure the java folder under test is marked as the Test Sources Root.
2. Right click on the java folder under test and click Run 'All Tests' or Run 'All Tests' with Coverage.

### Postman Collection
1. Open Postman.
2. On the top left-hand corner, click Import.
3. Select the tab for Import From Link, insert the url: https://www.getpostman.com/collections/841a02c25bc5ef16cd3d and hit Import.
