PermitFlow App: Streamlined Permit Application for San Francisco Residential Jobs
=================================================================================

Welcome to the PermitFlow app! This application simplifies the process of determining permit requirements for residential construction projects in San Francisco.

Project Demo
------------

<div align="center">
<iframe src="https://www.loom.com/embed/15fc757f162d4fc5948a097f573c6f8f?sid=3b9a31be-20c6-49fd-8947-938438cf517c" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="width: 640px; height: 360px;"></iframe>
</div>

Project Structure
-----------------

This project is divided into two main folders:

-   **`permit-app-backend`**: A Node.js backend server built with TypeScript and Express.
-   **`permit-app-frontend`**: A React frontend built with TypeScript.

This separation promotes a clear division of concerns, making development and maintenance easier by decoupling the frontend and backend technologies.

Initial Approach: Database-Driven Design
----------------------------------------

The initial plan was to leverage **Prisma** as an ORM for a PostgreSQL database. This would have allowed for a highly flexible schema, capable of handling complex questionnaire logic and customizations.
<img width="1424" alt="Screenshot 2024-05-13 at 2 29 32 PM" src="https://github.com/bardbyte/permitflow/assets/26562755/33efe18a-513f-4646-8bc0-5154e8affd82">

However, due to a mishap with Docker volumes, the database data wasn't persisted, leading to a change in strategy.

Pivoting to a Configuration-Driven Solution
-------------------------------------------

To save time and simplify the backend, we switched to a **configuration-driven architecture** using JSON files:

-   **`questionnaire-config.json`:** Defines the questionnaire structure, questions, options, and their relationships.
-   **`permit-requirements.json`:** Stores the possible permit requirements and their descriptions.

This approach allows for easy modification and addition of new questionnaires without altering the core backend code.

Backend Implementation
----------------------

[Code Snippet: `src/index.ts`, `src/routes/questionnaire.ts`, and `src/services/permitService.ts`]

-   **Express.js:** Handles API requests for fetching the questionnaire (`GET /:id`) and submitting user answers (`POST /:id/submit`).
-   **`determinePermitRequirement` Function:** This function in `permitService.ts` analyzes the user's answers against the configuration rules to determine the appropriate permit requirement.

Frontend Implementation
-----------------------

[Code Snippet: `App.tsx`, `Workflow.tsx`, and `Question.tsx`]

-   **React:** The frontend is built with React using TypeScript for better type safety and maintainability.
-   **Dynamic Rendering:** Questions are dynamically rendered based on user responses and the dependencies defined in `questionnaire-config.json`.
-   **API Calls:** Axios handles communication with the backend, fetching the questionnaire and submitting answers.

Challenges & Lessons Learned
----------------------------

The main challenge was ensuring the correct format of the `answers` payload sent to the backend, which was resolved through careful debugging and restructuring.
<img width="1512" alt="Screenshot 2024-05-13 at 2 06 17 AM" src="https://github.com/bardbyte/permitflow-app/assets/26562755/18dd55e0-4d95-4386-935a-1c4bfd1ea495">



**Key Lessons:**

-   **Data validation** is crucial for reliable applications.
-   Clear communication between **frontend and backend** teams is essential.
-   **Persistence is key** in overcoming technical obstacles.

Future Enhancements
-------------------

-   **Database Integration:** Incorporate a database to store user responses and provide more robust features.
-   **Error Handling:** Implement comprehensive error handling for a better user experience.
-   **Enhanced UX:** Improve UI design with clearer instructions, progress indicators, and navigation.
-   **Containerization with Docker:** Set up Docker to easily deploy and scale the application.

Running the Application
-----------------------

1.  **Backend:**

    -   `cd permit-app-backend`
    -   `npm install`
    -   `npm run dev` (or `node dist/index.js` if not using nodemon)
2.  **Frontend:**

    -   `cd permit-app-frontend`
    -   `npm install`
    -   `npm start`

Running Backend Tests
---------------------

-   From the `permit-app-backend` directory, run:

    Bash

    ```
    npm run test

    ```


Approach and Rationale
----------------------

The goal was to deliver a functional solution quickly, prioritizing flexibility and maintainability. The configuration-driven architecture achieves this by decoupling data from code. While simple initially, it can be easily extended with a database and additional features as needed.
