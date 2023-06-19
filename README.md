# Pexip Tutorial: Web PexRTC

In this tutorial we will learn how to build a videoconferencing app that will work in any device with a browser. This tutorial only have the code examples. The tutorial explaining all the steps and each small detail, can be found in our [Developer Portal](https://developer.pexip.com/docs/category/pexrtc).

## Requirements
Before starting any of these tutorials, you will need to comply with the following requirements:

- **NodeJS and npm:**  You need to install these tools on your system. There are packages for any OS and normally you would install both together.
- **Text editor:** You can use whatever you want, although our recommendation is to use Visual Studio Code.
- **Browser:** You will need a browser with WebRTC support. The recommendation is to use the latest version of Google Chrome.
- **JavaScript and React knowledge:** You will need solid JavaScript knowledge if you want to take advantage of these tutorials. Having some knowledge of React is recommended, but not essential.
- **Access to a Pexip Infinity deployment:** This is the server that the app will use to connect. You could have your own Pexip Infinity deployment or access a demo environment. If you have any doubt about this, contact your Pexip representative.

## Steps

In this project we define several steps. Each step is divided in two sub-steps `Exercise` for the starting point and `Solution` with the completed code. Each sub-step is located in a separated `branch`. This division allows the student to continue the tutorial from any point without having to develop the whole application and check the solution.

Here is a list of the available `branches` (only for `Exercise`):

* `Step.01-Exercise-Join-a-conference`: Build the minimum code for joining to a conference.
* `Step.02-Exercise-Use-a-pin`: Join to a conference that is protected by a PIN.
* `Step.03-Exercise-Mute-audio-and-video`: Mute the user microphone and camera.
* `Step.04-Exercise-Receive-presentation`: Add the possibility to receive a presentation from other participant.
* `Step.05-Exercise-Send-presentation`: Add a new feature to share the screen with other participants.

If you have any question about this tutorial, don't hesitate to contact us in our [Community Portal](https://community.pexip.com).


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
