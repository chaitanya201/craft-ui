# Craft-UI

Craft-UI is a modern, scalable, and developer-friendly UI component library inspired by ShadCN UI. Built with a focus on reusability and performance, it provides a seamless experience for building elegant user interfaces with minimal effort.

## 🚀 Features

- **Pre-Built UI Components** – A collection of ready-to-use, customizable UI components.
- **Type-Safe** – Built with TypeScript for enhanced type safety and developer experience.
- **Performance Optimized** – Uses best practices to ensure minimal re-renders and fast load times.
- **Theming Support** – Easily customizable with Tailwind CSS for consistent styling across applications.
- **Authentication Ready** – Integrated JWT authentication for secure user sessions.
- **Scalable & Modular** – Designed for scalability and easy integration into any project.

## 🛠️ Tech Stack

- **Frontend:** React, Remix, Tailwind CSS, TypeScript, Custom React Hooks
- **Backend:** Node.js, Express.js, Sequelize, TypeScript
- **Database:** PostgreSQL
- **Authentication:** JSON Web Tokens (JWT)
- **Deployment:** Docker, Kubernetes, AWS

## 📦 Installation

Clone the repository and install dependencies:

```sh
 git clone https://github.com/chaitanya201/craft-ui.git
 cd craft-ui
 cd frontend
 npm install
 cd backend
 npm install
```

## 🚀 Running the Project

### Development
```sh
 # run this for each part, frontend and backend 
 npm run dev
```

### Production Build
```sh
 npm run build
```

## 🔧 Configuration

Create a `.env` file in the root directory and configure the following environment variables:

```env
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
PORT=5000
```

## 🌐 Deployment

Craft-UI is containerized and orchestrated using Docker and Kubernetes. To deploy on AWS, follow these steps:

1. Build and push Docker images:
   ```sh
   docker build -t your-docker-repo/craft-ui .
   docker push your-docker-repo/craft-ui
   ```

2. Apply Kubernetes configurations:
   ```sh
   kubectl apply -f k8s/
   ```

3. Expose the application via Ingress Controller.

---

🔗 **Connect with me:** [LinkedIn](https://www.linkedin.com/in/im-chaitanya-sawant/) | [GitHub](https://github.com/chaitanya201)

