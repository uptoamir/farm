# Development Guidelines

## Environment Setup

To set up the development environment for this project, follow these steps:

Install Node.js and npm.

Clone the project repository from GitHub.(clone https://gitlab.nilva.ir/mci-farm/front/app-farm-client.git)

Run npm install to install the required packages and dependencies.

Run npm run dev for develope project.

## Folder Structure

The folder structure for this project is as follows:

**'src/'**: Contains the source code for the project.

**'assets/'**: Contains the **fonts** and **images** and **theme**(mui theme) for the project.

**'core/'**: Contains the **components** and **utils**(contains the tools like getToken function) and **themes**, **layouts**, **api**, **redux** and **logging**

**'pages/'**: This folder is used by **next** and it does the **routing** and includes the folders that are related to the **pages** and usually the module(or screens) inside this folder is **imported**.This folder is used to specify how pages are rendered and there should not be any logic inside this page.

**'features/'**: We follow clean architecture like structure, thus we have a common folder encompassing shared components for the whole project named **core**, and **features** folder which breaks the project down to several main features, every feature should only depend on itself and core (should be noticed when importing). Also each feature breaks down to **api** (for api calls), **components** (for components except layouts), **containers** (for templates and layouts), **utils**, **types**

**'redux/'**: Contains the **slices** and **store** for the **redux-toolkit** package

**'utils/'**: Contains the content(constant data like keyword) and types(for typescript) file for the project.

## Build Process

To build the project, run **npm run build** in the project **root** directory.

We use the following tools and scripts for the build process:

**Webpack**: To bundle and optimize the code.

**Babel**: To transpile the code to ES5 for compatibility with older browsers.

**ESLint**: To enforce code style and catch errors.

## Code Style and Conventions

We follow the following code style and conventions:

JavaScript: We follow the Airbnb JavaScript Style Guide.

HTML: We use semantic HTML and follow the W3C HTML Guidelines.

CSS: We use the BEM (Block Element Modifier) methodology for naming conventions and
Material UI for css library

## Collaboration and Version Control

We use Git and GitHub for version control and collaboration. To contribute to the project, follow these guidelines:

Clone the project repository to your local machine.

Create a new branch for your changes.(new branch name is task name => task branch)

Make your changes and commit them to your branch.

Push your branch to the remote repository.

Create a pull request from your branch to the **develop** branch.

Wait for feedback and collaborate with the team to resolve any issues.

Once the pull request is approved, merge it to the **develop** branch.

## Branching & Merge Requests

We follow git flow branching pattern. We have a **main** branch, no one pushes to this branch, it is only updated on
production deployments. Another important branch is **dev**, updated on stage releases, this is the main branch you need
to request a merge to for your changes. This branch as well does not allow pushing.

Everyone need to create a branch from **dev** and develop features, bug fix and changes in that branch and then create a
merge request to branch **dev**, **remember** to fill changelog before creating merge request.

**Note** that branches you create must follow this pattern **[category]/[branch_name]**, in which category is one of the
followings:

- **feature**
- **bugfix**
- **hotfix**: for bugfixes to be merged with released quickly
- **improv**: improvements
- **refactor**

e.g. feature/authentication-apis.

Also Note the followings:

- Do not abbreviate category name, wrong: feat/sth, correct: feature/sth
- Do not create a branch from anything other than **dev** branch unless discussed with lead
- Branch's commits should be clean and based on project's convention (read commit chapter)
- It is recommended to rebase branch history before merging and squash redundant commits
- Fill out changelog before creating a merge request

## Commits

Commits should be done as soon as possible, create a commit for almost everything you touch, make it a single action.

For committing below practices:

- Do not cast off committing to end of the day! Make it a routine for yourself, commit like professional developers,
  not some hairy ass dude selling junks in your neighbor
- Commit messages should consist two parts: subject and body. subject is a short sentence describing the action
  done in commit, body is for when the commit needs more explanation.
- Avoid making large commits (good commits will not contain more than 10 files normally,
  although it depends on the project) unless really necessary (like changing a function definition used in 100 places)
- Commit subjects should be capitalized. Also start with a verb, they describe an action which they do to project,
  don't make it about the past, or some third party person, **correct**: Add sign out to auth,
  **wrong**: Added sign out to auth, Adds sign out to auth, add sign out to auth, will add sign out to auth,
  I added sign out to auth, or any other thing
- Commit subjects do not need punctuation

## Deployment

We use the following tools and scripts for deployment:


## Troubleshooting and Debugging

If you encounter any issues during development or deployment, refer to the following resources:

Browser DevTools: To debug issues with the front-end code.

GitHub Issues: To report and track issues with the project.

Stack Overflow: To search for solutions to common issues.