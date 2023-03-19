# losstudy
React app for online studying

# App Component

This is the root component of the application. It renders:

- a Header component
- a Routes component that defines the app's routing
- a Footer component

## Routes

The component uses the `Routes` component from `react-router-dom` to define the app's routing. There are two routes defined:

- The `/:page?` route renders the `Courses` and `About` components. The `:page` parameter is optional.
  - The `Courses` component handles the list of courses. It receives props `isLoading`, `courseList`, and `onCoursesLoaded`.
  - The `About` component provides general information about the app.
- The `/course/:id` route renders the `CoursePage` component. The `:id` parameter specifies which course to render.

## State

This component has a state with the following properties:

- `hasError`: a boolean flag that indicates whether there was an error while rendering the app
- `courseList`: an array of course objects, fetched from the server
- `isLoading`: a boolean flag that indicates whether the course list is being fetched

## componentDidCatch()

This lifecycle method is used to catch errors that occur within the component tree. If there is an error, it sets the `hasError` state property to true.

## onCoursesLoaded()

This method is called when the course data has been loaded from the server. It sets the `courseList` and `isLoading` state properties. 

## Render

If there is an error, the app renders the `ErrorIndicator` component.

Otherwise, it renders the `Header`, `Routes`, and `Footer` components.
