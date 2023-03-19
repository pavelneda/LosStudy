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

# CoursePage Component

This is a React component named `CoursePage` that renders a video player, list of lessons, details of course. 


## Details

### CoursePage
- React component that fetches and displays a video player and a list of lessons, details of course
- `useEffect` is used to fetch the course information using `ApiService`, and then sorting and setting the lessons state based on the order of lessons. Cookies are also used to save progress and then load this progress after the component mounts And is used to add a keydown event listener for changing `playbackRate` of video and to remove the listener and set Cookies before unmounting the component.
-  `useBeforeunload` is used to set Cookies before unloading the page.
- `spinner` component is rendered if the api request is still pending.
- `ErrorIndicator` component is rendered if an error occurs during the api request.
-  `renderVideo()` function is called to display video: if the video is unlocked, a `ReactPlayer` component will be rendered with the specified url and `playbackRate`, otherwise an image of a locked video or an error message will be rendered. 
-  When a `ReactPlayer` component is first mounted, `onReady()` function will be called to seek to the saved location.
- `onProgress` function will be called on each progress update to save the time of the video.
- `onLessonSelected` function will be called each time a new lesson is selected in `lessonsList`.


# API Service

This is an implementation of the ApiService class that provides methods to interact with the Wisey API. The Wisey API provides information about courses and lessons available on the platform.

## API Base URL

The base URL for the Wisey API is https://api.wisey.app/api/v1.

## Methods

### `getResource(url: string, requestOptions: object)`

This method is used to make requests to the Wisey API. It takes two arguments:

- `url`: The endpoint to make the request to
- `requestOptions`: An object that can be used to customize the request, such as setting the request method or headers

The method returns a JSON object representing the response from the API.

### `_getToken()`

This method retrieves an authentication token from the Wisey API. It is used internally by other methods to authenticate requests to the API.

### `getAllCourses()`

This method retrieves all available courses from the Wisey API. It returns an array of transformed course objects that have been mapped to a specific format using the `_transformCourseForList` method.

### `getCourse(id: string)`

This method retrieves a specific course by ID from the Wisey API. It returns a transformed course object that has been mapped to a specific format using the `_transformCourse` method.

### `_transformCourseForList(course: object)`

This method is used to transform a course object from the API into a format suitable for displaying in a list. It returns an object with the following properties:

- `id`: The ID of the course
- `title`: The title of the course
- `img`: A URL to the course preview image
- `courseVideoPreview`: A URL to a preview video for the course
- `lessonsCount`: The number of lessons in the course
- `rating`: The rating of the course
- `skills`: An array of skills associated with the course

### `_transformCourse(course: object)`

This method is used to transform a course object from the API into a format suitable for displaying in detail. It returns an object with the following properties:

- `id`: The ID of the course
- `title`: The title of the course
- `description`: The description of the course
- `lessons`: An array of transformed lesson objects

### `_transformLesson(lesson: object)`

This method is used to transform a lesson object from the API into a format suitable for displaying. It returns an object with the following properties:

- `id`: The ID of the lesson
- `title`: The title of the lesson
- `order`: The order of the lesson in the course
- `status`: The status of the lesson
- `link`: A URL to the lesson


# Pagination Component

This is a React functional component that renders a pagination section for a list of courses. The component receives the following props:

- `coursesPerPage`: A number representing the number of courses to display per page.
- `totalCourses`: A number representing the total number of courses in the list.
- `paginate`: A callback function that will be called when a page number is clicked. It receives the number of the clicked page as an argument.
- `onClickNext`: A callback function that will be called when the "next" button is clicked.
- `onClickPrev`: A callback function that will be called when the "previous" button is clicked.

The component calculates the total number of pages based on the `totalCourses` and `coursesPerPage` props. It then renders a list of page numbers as list items, using the `pageNumbers` array. The `paginate` function is called when a page number is clicked, passing the number of the clicked page as an argument.

The "next" and "previous" buttons call the `onClickNext` and `onClickPrev` functions, respectively, when clicked.

The pagination section is wrapped in a `<ul>` element with the class "pagination". Each page number is rendered as a list item with the class "pagination-number". The "next" and "previous" buttons are also rendered as list items, with the classes "pagination-btn" and "next" or "prev", respectively. The buttons contain icons from the `fa-solid` fontawesome icon set.
