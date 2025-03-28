Human Capital Management System (HCM) :briefcase:
The Human Capital Management System (HCM) is a comprehensive solution designed to streamline and enhance human resource operations within organizations. Built using .NET 9 and React 19, it leverages MobX for efficient state management and implements the CQRS (Command Query Responsibility Segregation) pattern alongside the Mediator design pattern to ensure a scalable and maintainable architecture.​

Table of Contents :clipboard:
Overview

Features

Architecture

Technologies Used

Getting Started

Prerequisites

Installation

Usage

Contributing

License

Overview :mag:
HCM is tailored to meet the diverse needs of modern HR departments, offering functionalities such as employee management, recruitment tracking, performance evaluations, and more. By integrating the latest technologies and architectural patterns, HCM provides a responsive and user-friendly experience for HR professionals and employees alike.​

Features :sparkles:
Employee Management: Maintain detailed records of employee information, including personal details, job roles, and contact information.​

Recruitment Tracking: Manage job postings, track applicant progress, and streamline the hiring process.​

Performance Evaluations: Conduct and document employee performance reviews with customizable evaluation criteria.​

Leave Management: Handle leave requests, approvals, and maintain accurate leave balances.​

Role-Based Access Control: Ensure data security by assigning appropriate access levels to different user roles.​

Architecture :triangular_ruler:
The HCM system is structured following the principles of Clean Architecture, promoting separation of concerns and enhancing testability:​

Domain Layer: Encapsulates the core business logic and entities.​

Application Layer: Implements the CQRS pattern using the Mediator design pattern to handle commands and queries, facilitating clear separation between read and write operations.​

Infrastructure Layer: Manages data access, external services, and other infrastructure-related concerns.​

Presentation Layer: Consists of the React 19 frontend, utilizing MobX for state management to create a dynamic and responsive user interface.​

Technologies Used :hammer_and_wrench:
Backend:

.NET 9​

ASP.NET Core​

Entity Framework Core​

MediatR​

Frontend:

React 19​

MobX​
Markdown Guide

TypeScript​
GitHub
+1
GeeksforGeeks
+1

Database:

SQL Server​

Others:

Docker (for containerization)​

Swagger (for API documentation)​

xUnit (for testing)​
Gist
+1
GitHub Docs
+1

Getting Started :rocket:
Prerequisites :checkered_flag:
Before setting up the HCM system, ensure you have the following installed:

.NET 9 SDK​

Node.js (for frontend development)​

SQL Server​
GitHub Docs
+7
GitHub Docs
+7
jimit105.github.io
+7

Docker (optional, for containerization)
