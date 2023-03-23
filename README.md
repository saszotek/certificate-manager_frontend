# Certificate Manager - Frontend

**This repository is frontend part of a database system supporting the management of expiring certificates.**
Frontend part of Certificate Manager application is integrated with [certificate-manager_backend](https://github.com/saszotek/certificate-manager_backend) repository.
Application allows you to create an account or log into an existing one in order to manage qualified certificates. The main element of the application is the control panel that allows the user to manage imported client certificates by:
- change of its status,
- extending its validity period,
- sending a reminder email.

The system lets users generate reminders, that is a file containing the expiration dates of documents. The file can be imported into a online calendars (eg. Google Calendar).
Server-side pagination has been implemented to prevent page overload in case of a large number of documents imported into the system.

## Live version

**Live demo:** *offline*

## Technologies
- React.js
- React Redux
- React Router 
- Axios
- Yup
