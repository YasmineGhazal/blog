# Instructions
*The app is deployed [here](https://blog-nine-lilac-26.vercel.app/)*
- Clone github repo
- Open the terminal on the cloned repo directory
- Run `npm i`
- To start the project on your local device:
    - create a`.env` file and add the following keys:
        - For Oauth using google `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
        - Your base url for the auth `NEXTAUTH_URL` and `NEXT_PUBLIC_BASE_URL`
        - Mongodb connection string `MONGODB_URI`
        - Cloudinary keys to store the images: `NEXT_PUBLIC_CLOUDINARY_URL`, `NEXT_PUBLIC_CLOUDINARY_API_KEY`, `NEXT_PUBLIC_CLOUDINARY_API_SECRET`, and `NEXT_PUBLIC_CLOUDINARY_NAME`
    - Run `npm build`
    - Run `npm start`

# System routes and endpoints
- Backend endpoints:
    - GET `/api/posts/` to retrieve the posts from the db, to get a specific user's posts you can pass `userID` as a search param.
    - POST `/api/posts/` to insert new post
    - PUT `/api/posts/:id` to update existing post
    - Delete `/api/posts/:id` to delete a post
- Routes:
    - The main route `/` to get all the posts, if a post was created by the singed in user it will has buttons to edit and delete. to get a users' posts you can pass the users' id as a search param.
    - To edit a post the user can click on the edit button from the main page, "my posts" page, or by navigating to `/posts/:id`
    - To create a new post the user can click on "write" button or navigate to `/posts/new`

# CI/CD
The CI/CD pipeline is managed through the workflows/pipeline.yml file, which contains the following steps:
    - ESLint: Runs linting checks to catch any code quality issues.
    - Unit Tests: Runs the unit tests using a testing framework like Jest or React Testing Library.
    - Deploy: After passing the linting and testing steps, the workflow deploys the application to Vercel.
By using this CI/CD pipeline, we ensure that every code change goes through rigorous checks before being deployed, making the development process more efficient and reliable.

# Docker
To run the project using the defined dockerfile
- Build an image `docker build -t blog .`
- Set your environment vers and run the created image `docker run -p [images port]:[devise port] blog`

[System Design Document for Blogging Platform](https://docs.google.com/document/d/1Z_IvwxkQhvxWSLE50mGoEQZHvyqzAkF2hI4PCXGKknU/edit?usp=sharing)
