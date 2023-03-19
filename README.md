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


# Courses Component

- Import React, several other components, and CSS styles.
- Define a function to calculate the coordinates of the pagination element on the page.
- Define a higher-order component to pass navigation and params as props to the Courses component.
- Define a class component called `Courses` that includes an instance of `ApiService`, a `_coord` variable that will store the pagination element's coordinates, and a state object that includes the `currentPage`, `coursesPerPage`, and `coordPagination` properties.
- Use the `componentDidMount` lifecycle method and fetch API to get all courses when the component mounts, and then update the component's state.
- Implement the `componentDidUpdate` lifecycle method to update the pagination when the component updates.
- Define two methods for pagination: `paginate()`, which takes a `pageNumber` parameter and sets the current page to that value and navigates to that page using the navigation prop; and methods for next and previous pages that update the current page and navigates using the navigation prop.
- Define a `renderItems()` method to render the courses array passed down through props into a `list-style` layout that includes any preview images or videos, titles, and ratings.
- Render the items output from `renderItems()` inside the `Courses` section along with the `Pagination` component.
- Export the `Courses` component wrapped in `withNavigateAndParams()` as its default export.

