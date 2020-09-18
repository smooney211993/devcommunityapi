This is the client side of a social network for developers. It is a MERN STACK application that uses redux for state management. The functionality of this application includes : Sign up and sign in, All profiles publicaly available, Dashboard and post forum privatley avialable with protected routes, The ability to add and also delete experiences, educations whilst being able to edit them.

Problems that encountered whilst buidling with solutions or future improvements : Any component that was rendered via mapping through an array in the global state would often times say that the map was not a function, this was due to the fact that it was mapping through arrays that were not populated yet. A simple conditional statement would allow the component to only map once there was an array length over 0 (array > 0 && do something). In somecases there is alot of repeated code with components sharing the same code. Having a prop with a default case and conditionally re-rendering would allow for one component for multiple uses. Some of the forms need input validation such as the website form, this could probably be validated on the backend?

None of my previous apps ever needed state management so learning redux whilsts building the front end at times was proven to be quite difficult. Learning redux involved alot of documentation reading and googling specific problems. The initial set up of redux involves alot of boilerplate code - Might learn the useContext and useReducer from react as it involves less initial set up and other developing teams might prefer those tools.

Deployed app: https://devcommunity2000.herokuapp.com/login

The CSS and layout was provided through Brad traversy's Udemy course, however all the code is my own.
